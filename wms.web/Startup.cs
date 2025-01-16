using Autofac;
using wms.web.Configs;
using infrastructure.Configurations;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using MintPlayer.AspNetCore.SpaServices.Prerendering;
using MintPlayer.AspNetCore.SpaServices.Routing;
using WebMarkupMin.AspNetCore6;
using Microsoft.AspNetCore.Mvc.Razor;
using MintPlayer.AspNetCore.Hsts;

namespace wms.web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            HostBuilderItem.ConfigurationItem = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            AppSettingRegister.Binding(Configuration);
            HostBuilderItem.ServiceCollectionItem = services;

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = AppConfig.Common.SPARootPath;
                });

            // Define the SPA-routes for our helper
            services.AddSpaPrerenderingService<Services.SpaPrerenderingService>();
            services.AddWebMarkupMin().AddHttpCompression().AddHtmlMinification();

            services
                .Configure<RazorViewEngineOptions>(options =>
                {
                    var new_locations = options.ViewLocationFormats.Select(vlf => $"/Server{vlf}").ToList();
                    options.ViewLocationFormats.Clear();
                    foreach (var format in new_locations)
                        options.ViewLocationFormats.Add(format);
                })
                .Configure<WebMarkupMinOptions>(options =>
                {
                    options.DisablePoweredByHttpHeaders = true;
                    options.AllowMinificationInDevelopmentEnvironment = true;
                    options.AllowCompressionInDevelopmentEnvironment = true;
                    //options.DisablePoweredByHttpHeaders = false;
                })
                .Configure<HtmlMinificationOptions>(options =>
                {
                    options.MinificationSettings.RemoveEmptyAttributes = true;
                    options.MinificationSettings.RemoveRedundantAttributes = true;
                    options.MinificationSettings.RemoveHttpProtocolFromAttributes = true;
                    options.MinificationSettings.RemoveHttpsProtocolFromAttributes = false;
                    options.MinificationSettings.MinifyInlineJsCode = true;
                    options.MinificationSettings.MinifyEmbeddedJsCode = true;
                    options.MinificationSettings.MinifyEmbeddedJsonData = true;
                    options.MinificationSettings.WhitespaceMinificationMode = WebMarkupMin.Core.WhitespaceMinificationMode.Aggressive;
                });

            services.AddSession(options =>
            {
                options.Cookie.Name = AppConfig.Common.ClientName;
                options.IdleTimeout = TimeSpan.FromMinutes(60);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;

            });
        }

        //this method call by the runtime. when use register use AutofacServiceProviderFactory in function startup in program.cs
        public void ConfigureContainer(ContainerBuilder builder)
        {
            HostBuilderItem.ContainerBuilderItem = builder;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ISpaRouteService spaRouteService)
        {
            //HostBuilderItem.ApplicationBuilderItem = app;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseImprovedHsts();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = AppConfig.Common.SPARootPath;

                spa.UseSpaPrerendering(options =>
                {
                    options.BootModulePath = $"{spa.Options.SourcePath}/ClientApp/server/main.js";
                    options.ExcludeUrls = new[] { "/sockjs-node" };
                });

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
