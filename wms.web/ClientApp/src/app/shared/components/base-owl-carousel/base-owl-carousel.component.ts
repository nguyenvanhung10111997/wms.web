import { NgTemplateOutlet } from "@angular/common";
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from "@angular/core";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-base-owl-carousel",
  templateUrl: "./base-owl-carousel.component.html",
  styleUrls: ["./base-owl-carousel.component.scss"],
  standalone: true,
  imports: [
    NgTemplateOutlet,

    /** Others */
    CarouselModule
  ]
})
export class BaseOwlCarouselComponent {
  @Input() options: OwlOptions;
  @Input() dataSource: any[];
  @Output() dragging = new EventEmitter<any>();
  @Output() changed = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  @Output() translated = new EventEmitter<any>();
  @Output() initialized = new EventEmitter<any>();
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  convertStringIndex(index: number) {
    return String(index);
  }
}
