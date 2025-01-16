import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  info(message: string, sticky: boolean = false) {
    this.messageService.add({
      severity: "info",
      summary: "Thông Báo",
      detail: message,
      sticky: sticky
    });
  }

  warn(message: string, sticky: boolean = false) {
    this.messageService.add({
      severity: "warn",
      summary: "Thông Báo",
      detail: message,
      sticky: sticky
    });
  }

  error(message: string, sticky: boolean = false) {
    this.messageService.add({
      severity: "error",
      summary: "Thông Báo",
      detail: message,
      sticky: sticky
    });
  }
}
