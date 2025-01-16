import { CurrencyPipe } from "@angular/common";
import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[inputMoneyFormat]",
  standalone: true
})
export class InputMoneyFormatDirective {
  private el: HTMLInputElement;

  // Định dạng theo USD không có ký hiệu tiền tệ
  private formatOptions = {
    currency: "USD",
    display: "", // hoặc 'symbol-narrow' nếu bạn muốn ký hiệu USD nhỏ
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener("input", ["$event"])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Loại bỏ tất cả các ký tự không hợp lệ, chỉ giữ lại số và dấu chấm
    const cleanValue = value.replace(/[^\d.]/g, "");

    // Định dạng giá trị theo USD và loại bỏ ký hiệu tiền tệ
    const formattedValue = this.formatCurrency(cleanValue);

    // Cập nhật giá trị trong input
    this.el.value = formattedValue;

    // Đặt con trỏ vào cuối input sau khi cập nhật giá trị
    this.el.setSelectionRange(formattedValue.length, formattedValue.length);
  }

  private formatCurrency(value: string): string {
    // Chuyển đổi giá trị thành số thực để định dạng
    const num = parseFloat(value);
    if (isNaN(num)) {
      return "";
    }

    // Định dạng số tiền sử dụng CurrencyPipe
    const formattedCurrency = this.currencyPipe.transform(
      num,
      this.formatOptions.currency,
      this.formatOptions.display,
      "1.0-2"
    );

    // Trả về giá trị định dạng mà không có ký hiệu tiền tệ
    return formattedCurrency;
  }
}
