using Autofac;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Data;
using System.Reflection;

namespace infrastructure.Configurations
{
    public static class RegisterServiceContainer
    {
        public static void RegisterServiceDependencyAutofac(this ContainerBuilder builder)
        {
            RegisterInstanceInBusinessProjectToUsingCache(builder);
        }
        private static void RegisterInstanceInBusinessProjectToUsingCache(ContainerBuilder builder)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies()
                .Where(x => x.GetName().Name.Contains("web") || x.GetName().Name.Contains("infrastructure"));

            foreach (var assembly in assemblies)
            {
                if (assembly != null)
                {
                    builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces().InstancePerLifetimeScope();
                }
            }
        }
        public static IServiceCollection RegisterAssemblyTypes<T>(this IServiceCollection services, ServiceLifetime lifetime, List<Func<TypeInfo, bool>> predicates = null)
        {
            var scanAssemblies = AppDomain.CurrentDomain.GetAssemblies().ToList();
            scanAssemblies.SelectMany(x => x.GetReferencedAssemblies())
                .Where(t => false == scanAssemblies.Any(a => a.FullName == t.FullName))
                .Distinct()
                .ToList()
                .ForEach(x => scanAssemblies.Add(AppDomain.CurrentDomain.Load(x)));

            var interfaces = scanAssemblies
                .SelectMany(o => o.DefinedTypes
                    .Where(x => x.IsInterface)
                    .Where(x => x != typeof(T))
                    .Where(x => typeof(T).IsAssignableFrom(x))
                );

            foreach (var @interface in interfaces)
            {
                var types = scanAssemblies
                    .SelectMany(o => o.DefinedTypes
                        .Where(x => x.IsClass)
                        .Where(x => @interface.IsAssignableFrom(x))
                    );

                if (predicates?.Count > 0)
                {
                    foreach (var predict in predicates)
                    {
                        types = types.Where(predict);
                    }
                }

                foreach (var type in types)
                {
                    services.TryAdd(new ServiceDescriptor(
                        @interface,
                        type,
                        lifetime)
                    );
                }
            }

            return services;
        }
    }
}
