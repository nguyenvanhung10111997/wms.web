import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";

@Directive({
  selector: "[appOpenSearch]",
  standalone: true
})
export class OpenSearchDirective {
  @Output() isContainElement: EventEmitter<{
    event: MouseEvent;
    clickedInside: boolean;
  }> = new EventEmitter<{
    event: MouseEvent;
    clickedInside: boolean;
  }>();

  private firstClick: boolean = true;

  constructor(private el: ElementRef) {}

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    if (this.firstClick) {
      this.firstClick = false;
    } else {
      const clickedInside = this.el.nativeElement.contains(event.target);
      this.isContainElement.emit({
        event: event,
        clickedInside: clickedInside
      });
    }
  }
}
