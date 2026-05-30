import { ApplicationRef, ErrorHandler, inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly messageService = inject(MessageService);
  private readonly appRef = inject(ApplicationRef);

  handleError(error: unknown): void {
    const realError = error instanceof Error ? error : new Error(String(error));
    console.error(realError);
    this.messageService.add({
      severity: "error",
      summary: "Fatal Error",
      detail: realError.message,
    });
    queueMicrotask(() => {
      this.appRef.tick();
    });
  }
}
