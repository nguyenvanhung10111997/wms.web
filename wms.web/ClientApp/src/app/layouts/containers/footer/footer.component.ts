import { DatePipe } from "@angular/common";
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import {
  BaseImageComponent,
} from "~src/app/shared/components";

@Component({
  selector: "footer-layout",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  standalone: true,
  imports: [
    /** Components */
    BaseImageComponent,

    /** Pipes */
    DatePipe
  ]
})
export class FooterLayoutComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{
  @Input() class: string = "footer-light"; // Default class
  @Input() themeLogo: string = "assets/images/icon/logo.png"; // Default Logo
  @Input() newsletter: boolean = true; // Default True
  public today: number = Date.now();

  constructor(
    private _loader: LoaderService,
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
