import { inject } from "@angular/core";
import { MessageService, PrimeIcons } from "primeng/api";

export default class BaseComponent {
  protected readonly console = console;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly messageService = inject(MessageService);

  protected info(message: string) {
    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: message
    });
  }
  
  protected error(error: any, message?: string) {
    this.messageService.add({
      text: error,
      severity: "error",
      summary: message
    });
  }

  protected panic(error: any, message?: string): never {
    throw new Error(`${message}: ${error}`)
  }
}