import { Component, OnInit, Input, inject } from "@angular/core";
import {
  BreakpointService,
  Breakpoints
} from "~src/app/services/breakpoint.service";
import { BaseOwlCarouselComponent } from "../base-owl-carousel/base-owl-carousel.component";
import { NgStyle } from "@angular/common";
import { UnsubscribeOnDestroyAdapter } from "../../UnsubscribeOnDestroyAdapter";
import { BehaviorSubject } from "rxjs";
import { BaseImageComponent } from "../base-image/base-image.component";
import { baseOwlOption } from "~src/app/helpers/base-owl-carousel.helper";
import { onDraggingToStopLink } from "~src/app/helpers/base-owl-carousel.helper";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-one-slide-carousel-banner",
  templateUrl: "./one-slide-carousel-banner.component.html",
  styleUrls: ["./one-slide-carousel-banner.component.scss"],
  standalone: true,
  imports: [
    /** Router */
    RouterLink,

    /** Angular core */
    NgStyle,

    /** Components */
    BaseOwlCarouselComponent,
    BaseImageComponent
  ],
  providers: []
})
export class OneSlideCarouselBannerComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  breakpoints: Breakpoints;

  @Input() heightForPhoneOnly: string = "16rem";
  @Input() heightForTabletPortraitUp: string = "39.2rem";
  @Input() heightForTabletLandscapeUp: string = "39.2rem";
  @Input() heightForDesktopUp: string = "39.2rem";
  @Input() heightForBigDesktopUp: string = "39.2rem";

  @Input() set dataSource(
    value: {
      srcImage: string;
      id: string;
      title: string;
      url: string;
    }[]
  ) {
    if (value) {
      this.subjectDataSource.next(value);
    }
  }
  subjectDataSource = new BehaviorSubject<any>(null);

  @Input() borderRadius: string;

  customOptions = baseOwlOption({
    items: {
      L: 1,
      XL: 1,
      XXL: 1
    },
    loop: {
      L: true,
      XL: true,
      XXL: true
    },
    autoplay: {
      L: true,
      XL: true,
      XXL: true
    },
    dots: {
      L: true,
      XL: true,
      XXL: true
    },
    nav: {
      L: false,
      XL: true,
      XXL: true
    },
    stagePadding: {
      L: 0,
      XL: 0,
      XXL: 0
    }
  });

  heightCurrentSlide: string;
  stateDragging = { isDragging: false, clearTimeEvent: null };
  clearTimeEvent: any;
  listData = [];

  private _breakpoints = inject(BreakpointService);

  ngOnInit(): void {
    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;

        this.updateHeightSlide();
      }
    );

    this.subs.sink = this.subjectDataSource.subscribe(data => {
      if (data) {
        this.listData = data;
      }
    });
  }

  updateHeightSlide() {
    if (this.breakpoints.isPhoneOnly) {
      this.heightCurrentSlide = this.heightForPhoneOnly;
    } else if (this.breakpoints.isTabletPortraitUp) {
      this.heightCurrentSlide = this.heightForTabletPortraitUp;
    } else if (this.breakpoints.isTabletLandscapeUp) {
      this.heightCurrentSlide = this.heightForTabletLandscapeUp;
    } else if (this.breakpoints.isDesktopUp) {
      this.heightCurrentSlide = this.heightForDesktopUp;
    } else {
      this.heightCurrentSlide = this.heightForBigDesktopUp;
    }
  }

  onDraggingCarousel(event) {
    onDraggingToStopLink(event.dragging, this.stateDragging, 200);
  }
}
