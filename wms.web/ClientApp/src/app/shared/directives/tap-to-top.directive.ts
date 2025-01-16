import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from "@angular/core";

@Directive({
  selector: "[tapToTop]",
  standalone: true
})
export class TapToTopDirective implements OnInit {
  private isBrowser: boolean;
  private debounceTimeout: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Đặt trạng thái hiển thị ban đầu
    if (this.isBrowser) {
      this.updateVisibility(window.pageYOffset);
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.isBrowser) {
      // Sử dụng debounce để giảm tần suất xử lý sự kiện cuộn
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.updateVisibility(window.pageYOffset);
      }, 100);
    }
  }

  private updateVisibility(scrollPos: number) {
    if (scrollPos > 600) {
      this.renderer.setStyle(this.el.nativeElement, "display", "block");
    } else {
      this.renderer.setStyle(this.el.nativeElement, "display", "none");
    }
  }
}
