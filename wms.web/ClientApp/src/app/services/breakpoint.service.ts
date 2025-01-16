import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { BREAKPOINTS_VALUE } from "~src/app/config/constants";

@Injectable({
  providedIn: "root"
})
export class BreakpointService {
  private BreakpointsSubject: BehaviorSubject<Breakpoints> =
    new BehaviorSubject<Breakpoints>({
      isBigDesktopUp: false,
      isDesktopUp: false,
      isPhoneOnly: false,
      isTabletLandscapeUp: false,
      isTabletPortraitUp: false
    });
  breakpointsResult$ = this.BreakpointsSubject.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoint$.subscribe(state => {
      const newBreakpoints: Breakpoints = {
        isPhoneOnly: state.breakpoints[BREAKPOINTS_VALUE.FOR_PHONE_ONLY],
        isTabletPortraitUp:
          state.breakpoints[BREAKPOINTS_VALUE.FOR_TABLET_PORTRAIT_UP],
        isTabletLandscapeUp:
          state.breakpoints[BREAKPOINTS_VALUE.FOR_TABLET_LANDSCAPE_UP],
        isDesktopUp: state.breakpoints[BREAKPOINTS_VALUE.FOR_DESKTOP_UP],
        isBigDesktopUp: state.breakpoints[BREAKPOINTS_VALUE.FOR_BIG_DESKTOP_UP]
      };

      this.setBreakpoints(newBreakpoints);
    });
  }

  private readonly breakpoint$ = this.breakpointObserver
    .observe([
      //for-big-desktop-up
      BREAKPOINTS_VALUE.FOR_BIG_DESKTOP_UP,

      //for-desktop-up
      BREAKPOINTS_VALUE.FOR_DESKTOP_UP,

      //for-tablet-landscape-up
      BREAKPOINTS_VALUE.FOR_TABLET_LANDSCAPE_UP,

      //for-tablet-portrait-up
      BREAKPOINTS_VALUE.FOR_TABLET_PORTRAIT_UP,

      //for-phone-only
      BREAKPOINTS_VALUE.FOR_PHONE_ONLY
    ])
    .pipe(distinctUntilChanged());

  public setBreakpoints(breakpoints: Breakpoints) {
    this.BreakpointsSubject.next(breakpoints);
  }
}

export interface Breakpoints {
  isPhoneOnly: boolean;
  isTabletPortraitUp: boolean;
  isTabletLandscapeUp: boolean;
  isDesktopUp: boolean;
  isBigDesktopUp: boolean;
}
