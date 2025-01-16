import {
  Component,
  OnInit,
  Input,
} from "@angular/core";
import {
  DecimalPipe,
  NgOptimizedImage,
} from "@angular/common";
import { RouterLink } from "@angular/router";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import {
  BaseImageComponent,
} from "~src/app/shared/components";

@Component({
  selector: "header-layout",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [
    /** Angular core */
    NgOptimizedImage,
    DecimalPipe,

    /** Router */
    RouterLink,

    /** Components */
    BaseImageComponent,
  ],
  providers: []
})
export class HeaderLayoutComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @Input() class: string;
  @Input() themeLogo: string = "assets/images/icon/logo.png"; // Default Logo
  @Input() topbar: boolean = true; // Default True

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
    
  }
}
