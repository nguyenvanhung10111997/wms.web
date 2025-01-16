import {
  IMAGE_LOADER,
  ImageLoaderConfig,
  NgOptimizedImage,
  NgStyle
} from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-base-image",
  templateUrl: "./base-image.component.html",
  styleUrls: ["./base-image.component.scss"],
  standalone: true,
  imports: [
    /** Angular core */
    NgOptimizedImage,
    NgStyle
  ],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${config.src}`;
      }
    }
  ]
})
export class BaseImageComponent implements OnInit {
  @Input({ required: true }) src: string;
  @Input({ required: true }) alt: string;
  @Input({ required: true }) title: string;
  @Input({ required: true }) fill: boolean;
  @Input({ required: true }) priority: boolean;
  @Input({ required: true }) placeholder: boolean;
  @Input() theme: NgStyle;

  @Input() fallbackSrc: string = "/assets/images/error-loading.png";

  ngOnInit() {
    if (!this.src) {
      this.src = this.fallbackSrc;
    }

    if (
      !this.alt ||
      typeof this.alt === undefined ||
      typeof this.alt === null
    ) {
      this.alt = "alt image";
    }
  }

  onError(event: Event): void {
    (event.target as HTMLImageElement).srcset = this.fallbackSrc;
  }
}
