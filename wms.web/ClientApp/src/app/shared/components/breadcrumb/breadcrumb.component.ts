import { Component, OnInit, Input, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  BreakpointService,
  Breakpoints
} from "../../../services/breakpoint.service";
import { RouterLink } from "@angular/router";
import { UnsubscribeOnDestroyAdapter } from "../../UnsubscribeOnDestroyAdapter";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
  standalone: true,
  imports: [
    /** Router */
    RouterLink
  ],
  providers: []
})
export class BreadcrumbComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @Input()
  set title(value) {
    this.subjectTitle.next(value);
  }
  get title() {
    return this.subjectTitle.value;
  }
  @Input()
  set items(value) {
    this.subjectBreadcrumb.next(value);
  }
  get items() {
    return this.subjectBreadcrumb.value;
  }

  breakpoints: Breakpoints;

  subjectTitle = new BehaviorSubject<any>(null);
  subjectBreadcrumb = new BehaviorSubject<any>(null);
  lisBreadcrumb: any[] = [];

  private _breakpoints = inject(BreakpointService);

  ngOnInit(): void {
    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;
      }
    );

    this.subjectBreadcrumb.subscribe(async (data: any) => {
      if (data) {
        this.lisBreadcrumb = data;
      }
    });

    this.subjectTitle.subscribe(async (data: any) => {
      if (data) {
      }
    });
  }
}
