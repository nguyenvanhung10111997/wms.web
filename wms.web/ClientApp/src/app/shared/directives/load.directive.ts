import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";

@Directive({
  selector: "[appLoad]",
  standalone: true
})
export class LoadDirective implements AfterViewInit {
  @Output() onLoad: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.loadCallback();
  }

  private loadCallback(): void {
    // Xử lý logic khi phần tử được load
    this.onLoad.emit(this.elementRef.nativeElement);
  }
}
