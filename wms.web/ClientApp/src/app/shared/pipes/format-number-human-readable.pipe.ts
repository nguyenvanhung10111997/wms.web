import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatNumberHumanReadable",
  standalone: true
})
export class FormatNumberHumanReadablePipe implements PipeTransform {
  transform(value: any): string {
    if (value >= 1000000) {
      // Giữ lại một chữ số sau dấu thập phân cho các giá trị lớn hơn hoặc bằng 1 triệu
      return (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + "M";
    } else if (value >= 1000) {
      // Giữ lại một chữ số sau dấu thập phân cho các giá trị lớn hơn hoặc bằng 1 nghìn
      return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + "K";
    } else {
      return value.toString();
    }
  }
}
