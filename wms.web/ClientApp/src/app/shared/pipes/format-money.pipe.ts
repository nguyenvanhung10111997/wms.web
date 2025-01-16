import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatMoney",
  standalone: true
})
export class FormatMoneyPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value === null || value === undefined) {
      return "";
    }

    value = +value;
    const formattedValue = value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND"
    });

    return formattedValue.replace(/\s/g, "").replace("₫", "đ"); // Remove white space
  }
}
