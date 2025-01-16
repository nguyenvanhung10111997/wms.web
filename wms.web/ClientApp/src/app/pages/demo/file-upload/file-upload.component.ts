import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import {
  BreakpointService,
  Breakpoints
} from "~src/app/services/breakpoint.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";

import { IAppState } from "~src/app/stored/app.state";
import { Store } from "@ngrx/store";
import { LoaderService } from "~src/app/services/loader.service";
import { RouterLink } from "@angular/router";
import { BaseImageComponent } from "~src/app/shared/components";
import { FileUploadComponent } from "~src/app/shared/components/file-upload/file-upload.component";

@Component({
  selector: "file-upload-page",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  standalone: true,
  imports: [
    RouterLink,
    /** Containers */
    /** Mobile Containers */
    /** Directive */
    /** Components */
    FileUploadComponent,
    BaseImageComponent
  ],
  providers: []
})
export class FileUploadPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{
  breakpoints: Breakpoints;

  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);

  isLoading = false;
  lineCluster = [];
  fileUpload;

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;
      }
    );
  }

  onChangeFile(event) {
    console.log(event);
    this.fileUpload = event;
  }
}
