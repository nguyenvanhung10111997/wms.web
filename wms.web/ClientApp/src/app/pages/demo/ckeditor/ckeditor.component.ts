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
import { RouterLink } from "@angular/router";
import { BaseImageComponent } from "../../../shared/components/base-image/base-image.component";
import { CKEditorService } from "~src/app/services/ckeditor.service";

import { ChangeEvent, CKEditorModule } from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "ckeditor-page",
  templateUrl: "./ckeditor.component.html",
  styleUrls: ["./ckeditor.component.scss"],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    /** Containers */
    /** Mobile Containers */
    /** Directive */
    /** Components */
    BaseImageComponent,
    CKEditorModule
  ],
  providers: [CKEditorService]
})
export class CkeditorPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{
  breakpoints: Breakpoints;
  private _breakpoints = inject(BreakpointService);
  private _cKEditorService = inject(CKEditorService);

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  public isLayoutReady = false;
  public Editor = ClassicEditor;

  public ckeditorConfigContent: any = {
    placeholder: "Nhập nội dung",
    maxFileSizeKB: 500
  };

  ngOnInit(): void {
    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;
      }
    );
  }

  public async onReadyCKEditor(editor: any, maxFileSizeKB: number = 0) {
    this._cKEditorService.onReady(editor, maxFileSizeKB);
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor?.getData();
    console.log(data);
  }
}
