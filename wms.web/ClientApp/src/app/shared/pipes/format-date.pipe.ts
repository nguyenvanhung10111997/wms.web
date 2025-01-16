import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatDate",
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return "";

    const date = new Date(value);
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7"
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = `${dayOfWeek}, ${this.formatNumber(date.getDate())}/${this.formatNumber(date.getMonth() + 1)}/${date.getFullYear()} ${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}`;

    return formattedDate;
  }

  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
