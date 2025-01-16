import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "widget-radio-button",
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"],
  standalone: true,
  imports: [
    /** Angular core */
    NgClass
  ]
})
export class WidgetRadioButtonComponent {
  @Input() inputID: string;
  @Input() inputName: string;
  @Input() value: string;
  @Input() text: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;

  @Output() onChange = new EventEmitter<any>();

  handleRadioButtonChange(event, value) {
    this.checked = !this.checked;
    this.onChange.emit({ event, value });
  }
}
