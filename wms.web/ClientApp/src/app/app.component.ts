import {
  afterNextRender,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from "@angular/core";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { map, delay, withLatestFrom, filter } from "rxjs/operators";
import {
  Event,
  NavigationEnd,
  Router,
  RouterOutlet,
  Scroll
} from "@angular/router";
import { UnsubscribeOnDestroyAdapter } from "./shared/UnsubscribeOnDestroyAdapter";
import { SeoService } from "./core/service/seo.service";
import { environment } from "../environments/environment";
import { ViewportScroller, isPlatformBrowser } from "@angular/common";
import {
  LoaderComponent,
  OverlayComponent,
  TapToTopComponent
} from "./shared/components";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { FlowbiteService } from "./services/flowbite.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [
    /** Router */
    RouterOutlet,

    /** Components */
    TapToTopComponent,
    OverlayComponent,
    LoaderComponent,
    /** Other */
    LoadingBarHttpClientModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AppComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  title = "title";
  version = "v0.1";
  // For Progressbar
  loaders = this._loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this._loader.progress$),
    map(v => v[1])
  );
  showLoadingApp = true;

  headerTopBannerClientHeight: number;
  sortProductOffsetTop: number;
  isBrowser: boolean;
  constructor(
    private _loader: LoadingBarService,
    private _seoService: SeoService,
    private _router: Router,
    private _viewportScroller: ViewportScroller,
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);

    this._router.events
      .pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
      .subscribe(e => {
        if (e.position) {
          this._viewportScroller.scrollToPosition(e.position);
        }
      });

    this._router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe(e => {
        if (this.isBrowser) {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      });
  }

  ngOnInit(): void {
    this._seoService.setData({
      title: "",
      description: "",
      author: environment.author,
      image: environment.imageUrl,
      url: environment.siteUrl,
      keywords: "",
      type: "website",
      published: new Date().toString()
    });
  }
}
