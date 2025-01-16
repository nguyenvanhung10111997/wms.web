import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink
} from "@angular/router";

import {
  BreakpointService,
  Breakpoints
} from "~src/app/services/breakpoint.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { NgClass } from "@angular/common";

@Component({
  selector: "mobile-header-main-layout",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [
    /** Angular Core */
    NgClass,
    RouterLink
  ],
  providers: []
})
export class MobileHeaderMainLayoutComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  breakpoints: Breakpoints;
  searchValue: string;
  isShowSearchResult: boolean = false;
  isShowPopupFilter: boolean = false;
  isFiltering: boolean = false;
  isShowButtonSearch: boolean = true;
  previousQueryParams: Params;
  currentUrl;

  @ViewChild("searchInput") searchInput!: ElementRef;

  private _breakpoints = inject(BreakpointService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;
      }
    );

  }
}
