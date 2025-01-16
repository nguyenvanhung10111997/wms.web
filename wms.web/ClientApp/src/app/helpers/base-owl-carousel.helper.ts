import { OwlOptions } from "ngx-owl-carousel-o/lib/models/owl-options.model";

interface IParamsBaseOwlOption<T> {
  L: T;
  XL: T;
  XXL: T;
}

interface IParamsOption {
  items: NumberParamsBaseOwlOption;
  loop?: BooleanParamsBaseOwlOption;
  margin?: NumberParamsBaseOwlOption;
  autoplay?: BooleanParamsBaseOwlOption;
  autoplayTimeout?: NumberParamsBaseOwlOption;
  autoplayMouseleaveTimeout?: NumberParamsBaseOwlOption;
  dots?: BooleanParamsBaseOwlOption;
  nav?: BooleanParamsBaseOwlOption;
  stagePadding?: NumberParamsBaseOwlOption;
  pullDrag?: BooleanParamsBaseOwlOption;
  mouseDrag?: BooleanParamsBaseOwlOption;
  touchDrag?: BooleanParamsBaseOwlOption;
}

type NumberParamsBaseOwlOption = IParamsBaseOwlOption<number>;
type BooleanParamsBaseOwlOption = IParamsBaseOwlOption<boolean>;

/** Hàm cơ bản cho thư viện ngx-owl-carousel */
export const baseOwlOption = (options: IParamsOption): OwlOptions => {
  const defaultOptions: IParamsOption = {
    items: {
      L: 0,
      XL: 0,
      XXL: 0
    },
    loop: {
      L: false,
      XL: false,
      XXL: false
    },
    margin: {
      L: 15,
      XL: 20,
      XXL: 20
    },
    autoplay: {
      L: false,
      XL: false,
      XXL: false
    },
    autoplayTimeout: {
      L: 3000,
      XL: 5000,
      XXL: 5000
    },
    autoplayMouseleaveTimeout: {
      L: 1500,
      XL: 3000,
      XXL: 3000
    },
    dots: {
      L: true,
      XL: false,
      XXL: false
    },
    nav: {
      L: false,
      XL: true,
      XXL: true
    },
    stagePadding: {
      L: 10,
      XL: 20,
      XXL: 20
    },
    pullDrag: {
      L: true,
      XL: true,
      XXL: true
    },
    mouseDrag: {
      L: true,
      XL: true,
      XXL: true
    },
    touchDrag: {
      L: true,
      XL: true,
      XXL: true
    }
  };

  // Kết hợp giá trị mặc định với giá trị được truyền vào
  const mergedOptions = {
    items: { ...defaultOptions.items, ...options.items },
    loop: { ...defaultOptions.loop, ...options.loop },
    margin: { ...defaultOptions.margin, ...options.margin },
    autoplay: { ...defaultOptions.autoplay, ...options.autoplay },
    autoplayTimeout: {
      ...defaultOptions.autoplayTimeout,
      ...options.autoplayTimeout
    },
    autoplayMouseleaveTimeout: {
      ...defaultOptions.autoplayMouseleaveTimeout,
      ...options.autoplayMouseleaveTimeout
    },
    dots: { ...defaultOptions.dots, ...options.dots },
    nav: { ...defaultOptions.nav, ...options.nav },
    stagePadding: { ...defaultOptions.stagePadding, ...options.stagePadding },
    pullDrag: { ...defaultOptions.pullDrag, ...options.pullDrag },
    mouseDrag: { ...defaultOptions.mouseDrag, ...options.mouseDrag },
    touchDrag: { ...defaultOptions.touchDrag, ...options.touchDrag }
  };

  const optionsResult: OwlOptions = {
    navSpeed: 300,
    smartSpeed: 300,
    dragEndSpeed: 300,
    fluidSpeed: true,
    skip_validateItems: true,
    navText: [
      '<i class="ti-angle-left"></i>',
      '<i class="ti-angle-right"></i>'
    ],
    autoplayHoverPause: true,

    responsive: {
      //breakpoint: for-phone-only & for-tablet-portrait-up
      0: {
        items: mergedOptions.items.L,
        loop: mergedOptions.loop.L,
        margin: mergedOptions.margin.L,
        autoplay: mergedOptions.autoplay.L,
        autoplayTimeout: mergedOptions.autoplayTimeout.L,
        autoplayMouseleaveTimeout: mergedOptions.autoplayMouseleaveTimeout.L,
        dots: mergedOptions.dots.L,
        nav: mergedOptions.nav.L,
        stagePadding: mergedOptions.stagePadding.L,
        pullDrag: mergedOptions.pullDrag.L,
        mouseDrag: mergedOptions.mouseDrag.L,
        touchDrag: mergedOptions.touchDrag.L
      },
      //breakpoint: for-tablet-landscape-up
      600: {
        items: mergedOptions.items.XL,
        loop: mergedOptions.loop.XL,
        margin: mergedOptions.margin.XL,
        autoplay: mergedOptions.autoplay.XL,
        autoplayTimeout: mergedOptions.autoplayTimeout.XL,
        autoplayMouseleaveTimeout: mergedOptions.autoplayMouseleaveTimeout.XL,
        dots: mergedOptions.dots.XL,
        nav: mergedOptions.nav.XL,
        stagePadding: mergedOptions.stagePadding.XL,
        pullDrag: mergedOptions.pullDrag.XL,
        mouseDrag: mergedOptions.mouseDrag.XL,
        touchDrag: mergedOptions.touchDrag.XL
      },
      //breakpoint: for-desktop-up & for-big-desktop-up
      900: {
        items: mergedOptions.items.XXL,
        loop: mergedOptions.loop.XXL,
        margin: mergedOptions.margin.XXL,
        autoplay: mergedOptions.autoplay.XXL,
        autoplayTimeout: mergedOptions.autoplayTimeout.XXL,
        autoplayMouseleaveTimeout: mergedOptions.autoplayMouseleaveTimeout.XXL,
        dots: mergedOptions.dots.XXL,
        nav: mergedOptions.nav.XXL,
        stagePadding: mergedOptions.stagePadding.XXL,
        pullDrag: mergedOptions.pullDrag.XXL,
        mouseDrag: mergedOptions.mouseDrag.XXL,
        touchDrag: mergedOptions.touchDrag.XXL
      }
    }
  };

  return optionsResult;
};

/** Drag carousel sẽ stop link */
export const onDraggingToStopLink = (
  dragging,
  state: { isDragging: boolean; clearTimeEvent: any },
  timeOut: number = 300
) => {
  if (dragging) {
    if (state.isDragging) {
      // clear event
      clearTimeout(state.clearTimeEvent);
    }

    state.isDragging = true;
  } else {
    state.clearTimeEvent = setTimeout(() => {
      state.isDragging = false;
    }, timeOut);
  }
};
