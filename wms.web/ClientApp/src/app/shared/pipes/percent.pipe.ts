import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatPercent",
  standalone: true
})
export class PercentPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return "";
    }

    return `${value}%`;
  }
}
