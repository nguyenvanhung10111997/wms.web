import { Component, Inject, OnInit } from "@angular/core";
import { UnsubscribeOnDestroyAdapter } from "../../UnsubscribeOnDestroyAdapter";
import { AnimationItem } from "lottie-web/build/player/lottie_light.min.js";
import { LottieComponent, AnimationOptions } from "ngx-lottie";
import { LoaderService } from "~src/app/services/loader.service";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
  standalone: true,
  imports: [LottieComponent]
})
export class LoaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  showLoader: boolean = false;
  private animationItem: AnimationItem | undefined;
  options: AnimationOptions = {
    path: "/assets/jsons/be-ut.json",
    loop: true,
    autoplay: true
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
  constructor(
    private _loaderService: LoaderService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    super();
  }
  ngOnInit(): void {
    this._loaderService.loading$.subscribe(value => {
      this.showLoader = value;
    });
  }
}
