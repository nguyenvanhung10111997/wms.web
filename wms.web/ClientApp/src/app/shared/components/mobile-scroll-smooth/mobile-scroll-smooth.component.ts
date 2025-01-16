import { NgClass, NgStyle, NgTemplateOutlet } from "@angular/common";
import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  AfterContentInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-mobile-scroll-smooth",
  templateUrl: "./mobile-scroll-smooth.component.html",
  styleUrls: ["./mobile-scroll-smooth.component.scss"],
  standalone: true,
  imports: [NgStyle, NgClass, NgTemplateOutlet]
})
export class MobileScrollSmoothComponent
  implements OnInit, AfterContentInit, OnChanges
{
  @Input({ required: true }) dataSource: any[];
  @Input({ required: true }) items: number | string;
  @Input() margin: number | string = 0;
  @Input({ required: true }) nav: boolean;
  @Output() loadMore = new EventEmitter<void>();

  @ViewChild("mainElement", { static: true }) mainElement: ElementRef;
  @ContentChildren("scrollItem", {
    descendants: true,
    read: ElementRef,
    emitDistinctChangesOnly: true
  })
  scrollItems: QueryList<ElementRef>;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() threshold: number;

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.updateSizes();

    this.updateScrollBarListActive(this.scrollItems);
  }

  widthOfItem: number;
  widthOfMainElement: any;
  activeSlide: number = 0;
  scrollBarListActive: any[];

  /** Html */
  widthScrollMoothItem: string;
  marginScrollMoothItem: string;
  widthScrollBar: string;
  leftScrollBarItem: string;

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    /** Calculate html */
    this.marginScrollMoothItem = this.handleConvertToPixel(this.margin);

    this._renderer.listen(
      this.mainElement.nativeElement,
      "scroll",
      (event: any) => {
        let offsetLeftMainElement =
          this.mainElement.nativeElement.scrollLeft +
          this.mainElement.nativeElement.offsetLeft;

        const scrollBarListActiveLength = this.scrollBarListActive.length;

        // Check and update activeSlide
        for (let i = 0; i < scrollBarListActiveLength; i++) {
          if (i === 0 && offsetLeftMainElement < this.scrollBarListActive[i]) {
            this.activeSlide = i;
          } else if (offsetLeftMainElement >= this.scrollBarListActive[i]) {
            this.activeSlide = i + 1;
          }
        }

        this.leftScrollBarItem = this.handleCalculatePositionTrackBar();

        // Check if have loadMore event
        if (this.loadMore) {
          this.checkIfEndReached();
        }
      }
    );
  }

  ngAfterContentInit(): void {
    this.scrollItems.changes.subscribe(value => {
      this.updateScrollBarListActive(value);
    });

    this.updateSizes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.widthScrollBar = this.handleCalculateWidthScrollBar();
    }
  }

  private updateSizes(): void {
    this.widthOfMainElement = this.mainElement.nativeElement.clientWidth;
    this.widthOfItem = this.handleConvertWidthItem();
    this.widthScrollMoothItem = `${this.widthOfItem}px`;
  }

  private updateScrollBarListActive(list: QueryList<ElementRef<any>>): void {
    const standardItems = this.handleConvertToNumber(this.items);

    let newArray: number[] = list.reduce(
      (total: number[], slideItem: ElementRef, index) => {
        let result: number;
        if (slideItem.nativeElement) {
          if (index === 0) {
            result = this.widthOfItem + slideItem.nativeElement.offsetLeft;
          } else {
            result =
              total[index - 1] +
              this.handleConvertToNumber(this.margin) +
              this.widthOfItem;
          }
          total.push(result);
        }
        return total;
      },
      []
    );

    this.scrollBarListActive = this.getItemsByInterval(newArray, standardItems);
  }

  private handleConvertWidthItem() {
    const standardItems = this.handleConvertToNumber(this.items);
    const standardMargin = this.handleConvertToNumber(this.margin) - 1;

    const calculateMargin =
      standardItems % 1 === 0
        ? standardMargin * standardItems
        : standardMargin * Math.floor(standardItems);

    const result: number =
      (this.widthOfMainElement - calculateMargin) / standardItems;

    return result;
  }

  private getItemsByInterval(array: any[], items: number) {
    const roundedItems = items % 1 === 0 ? items : Math.ceil(items);
    const result = [];
    const lengthArray = array.length;

    for (let i = 0; i < lengthArray; i += roundedItems) {
      result.push(array[i]);
    }
    return result;
  }

  handleConvertToPixel(value: number | string) {
    return `${value}px`;
  }

  handleConvertToNumber(value: string | number) {
    return Number(value);
  }

  checkIfEndReached(): void {
    if (this.activeSlide >= this.threshold) {
      this.loadMore.emit();
    }
  }

  handleCalculateNumberScrollBarItem(
    length: number,
    items: number | string
  ): number {
    const itemsNumber = this.handleConvertToNumber(items);
    const roundedItems =
      itemsNumber % 1 === 0 ? itemsNumber : Math.ceil(itemsNumber);

    let result = 0;
    if (length % roundedItems === 0) {
      result = length / roundedItems;
    } else {
      result = Math.ceil(length / roundedItems);
    }
    return result;
  }

  handleCalculateWidthScrollBar() {
    const result =
      this.handleCalculateNumberScrollBarItem(
        this.dataSource.length,
        this.items
      ) * 10;
    return `${result}px`;
  }

  handleCalculatePositionTrackBar() {
    const result =
      (100 /
        this.handleCalculateNumberScrollBarItem(
          this.dataSource.length,
          this.items
        )) *
      this.activeSlide;
    return `${result}%`;
  }
}
