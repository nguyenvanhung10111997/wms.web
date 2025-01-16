import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatView",
  standalone: true
})
export class FormatViewPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) {
      return "";
    }

    // Nếu giá trị là chuỗi, chuyển đổi thành số
    let numericValue: number;

    if (typeof value === "string") {
      numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return "";
      }
    } else {
      numericValue = value;
    }

    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1 // Giới hạn số chữ số thập phân nếu cần
    });

    if (numericValue >= 1000000) {
      return formatter.format(numericValue / 1000000) + "M+";
    } else if (numericValue >= 1000) {
      return formatter.format(numericValue / 1000) + "K+";
    }

    return formatter.format(numericValue);
  }
}
