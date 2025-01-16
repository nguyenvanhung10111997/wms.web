import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatTwoDecimal",
  standalone: true
})
export class FormatTwoDecimalPipe implements PipeTransform {
  transform(value: number | string): string {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return "";
    }

    // Chuyển đổi chuỗi thành số nếu cần
    let numericValue: number;
    if (typeof value === "string") {
      numericValue = parseFloat(value.replace(/,/g, ""));
    } else {
      numericValue = value;
    }

    // Kiểm tra giá trị sau khi chuyển đổi
    if (isNaN(numericValue)) {
      return "";
    }

    // Làm tròn số xuống và chuyển đổi thành chuỗi
    return Math.floor(numericValue).toString();
  }
}
