import { isPlatformBrowser } from "@angular/common";
import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  Inject,
  PLATFORM_ID
} from "@angular/core";

@Directive({
  selector: "[scrollBackground]",
  standalone: true
})
export class ScrollBackgroundDirective {
  @Input("scrollBackground") background: string;
  isBrowser: boolean;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if(this.isBrowser){
      const scrollHeight = window.scrollY;
      if (scrollHeight > 0) {
        if (this.background.startsWith("url")) {
          this.renderer.setStyle(
            this.el.nativeElement,
            "background",
            `${this.background} no-repeat center/cover`
          );
        } else {
          this.renderer.setStyle(
            this.el.nativeElement,
            "background-color",
            this.background
          );
        }
      } else {
        this.renderer.removeStyle(this.el.nativeElement, "background");
      }
    }
  }
}
