import { Component, inject, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  BreakpointService,
  Breakpoints
} from "~src/app/services/breakpoint.service";
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "@angular/router";
import { HeaderLayoutComponent } from "../containers/header/header.component";
import { FooterLayoutComponent } from "../containers/footer/footer.component";
import { MobileFooterMainLayoutComponent } from "./mobile-containers/main/footer/footer.component";
import { MobileHeaderMainLayoutComponent } from "./mobile-containers/main/header/header.component";
import { isPlatformBrowser, NgClass } from "@angular/common";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { PageEnum } from "~src/app/config/enums/page.enum";
import {
  MobileScrollSmoothComponent,
  SafePageComponent
} from "~src/app/shared/components";
import { OverlayService } from "~src/app/services/overlay.service";
import { filter } from "rxjs";
import { UserPrincipal } from "~src/app/auth/models/user-principal.model";
import { StorageService } from "~src/app/auth/services/storage.service";
import { AuthService } from "~src/app/auth/services/auth.service";

@Component({
  selector: "main-layout",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  standalone: true,
  imports: [
    /** Components */
    MobileScrollSmoothComponent,
    SafePageComponent,

    /** Router */
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,

    /** Containers */
    HeaderLayoutComponent,
    FooterLayoutComponent,

    /** Mobile Containers */
    MobileHeaderMainLayoutComponent,
    MobileFooterMainLayoutComponent
  ],
  providers: []
})
export class MainLayoutComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  listDataMenu;

  breakpoints: Breakpoints;
  isBrowser: boolean = true;
  pageEnum = PageEnum;
  page: number;

  isOpenUserMenu: boolean = false;
  isOpenSideBar: boolean = false;
  userPrincipal: UserPrincipal;

  private _breakpoints = inject(BreakpointService);
  private _overlay = inject(OverlayService);

  constructor(
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private _router: Router,
    private _storageService: StorageService,
    private _authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
    this.listDataMenu = [
      {
        link: "/dashboard",
        name: "Dashboard",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/></svg>'
        )
      },

      // {
      //   link: "/test",
      //   name: "Quản lý nhà may",
      //   icon: this.sanitizer.bypassSecurityTrustHtml(
      //     '<svg class="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"/></svg>'
      //   )
      // },
      {
        link: "/lines",
        name: "Quản lý Chuyền",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg class="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 4 3 3H5v3m3 10-3-3h14v-3m-9-2.5 2-1.5v4"/></svg>'
        )
      },
      {
        link: "/clusters",
        name: "Quản lý Cụm",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg class="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v4m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>'
        )
      },
      {
        link: "/machines",
        name: "Quản lý Nút Bấm",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg class="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6"/></svg>'
        )
      },
      {
        link: "/static-shifts",
        name: "Quản lý Khung giờ làm",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg class="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/></svg>'
        )
      },
      {
        link: "/line-cluster-products",
        name: "Quản lý Mục Tiêu",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg class="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/></svg>'
        )
      },
      {
        link: "/manage-other",
        name: "Quản lý cân bằng chuyền",
        icon: this.sanitizer.bypassSecurityTrustHtml(
          '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5M3.5 7V13C3.5 16.7712 3.5 18.6569 4.67157 19.8284C5.37634 20.5332 6.3395 20.814 7.81608 20.9259" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 3H4C3.05719 3 2.58579 3 2.29289 3.29289C2 3.58579 2 4.05719 2 5C2 5.94281 2 6.41421 2.29289 6.70711C2.58579 7 3.05719 7 4 7H20C20.9428 7 21.4142 7 21.7071 6.70711C22 6.41421 22 5.94281 22 5C22 4.05719 22 3.58579 21.7071 3.29289C21.4142 3 20.9428 3 20 3H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 7L12 16M12 16L15 12.6667M12 16L9 12.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
        )
      }
    ];

    this._router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe(e => {
        if (this.isBrowser) {
          this._overlay.onHiddenOverlay();
        }
      });
  }
  ngOnInit(): void {
    this._route.parent.data.subscribe(data => {
      this.page = data.page;
    });

    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;
      }
    );

    this.userPrincipal = this.getCurrentUser();
  }

  direction: string;
  public config: any = {};

  onOpenMenuUser() {
    this.isOpenUserMenu = !this.isOpenUserMenu;
  }

  onOpenSideBar() {
    this.isOpenSideBar = !this.isOpenSideBar;

    if (this.isOpenSideBar === true) {
      this._overlay.onShowOverlay();
    } else {
      this._overlay.onHiddenOverlay();
    }
  }

  getCurrentUser() {
    var currentUser = this._storageService.getUser();

    if (currentUser == null) {
      currentUser = {};
      currentUser.FullName = "Bạn chưa đăng nhập";
    }

    return currentUser as UserPrincipal;
  }

  logout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._overlay.onHiddenOverlay();
  }
}
