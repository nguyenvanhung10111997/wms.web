import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "enumerate",
  standalone: true
})
export class EnumeratePipe implements PipeTransform {
  transform(n: number): number[] {
    if (n < 0) return [];
    n = Math.round(n);
    return [...Array(n)].map((_, i) => i);
  }
}
