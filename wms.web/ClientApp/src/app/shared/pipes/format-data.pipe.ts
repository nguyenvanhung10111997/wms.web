import { DatePipe } from "@angular/common";
import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dataTransformer",

  standalone: true
})
export class FormatDataPipe {
  constructor(private datePipe: DatePipe) {}

  dateFormat(format: string = "dd/MM/yy HH:mm") {
    return {
      transform: (value: any) => this.datePipe.transform(value, format)
    };
  }

  booleanFormat(format: any): PipeTransform {
    return {
      transform: value => {
        return value == null || value == undefined || value == ""
          ? format.isNull
          : value == true
            ? format.isTrue
            : format.isFalse;
      }
    };
  }
}
