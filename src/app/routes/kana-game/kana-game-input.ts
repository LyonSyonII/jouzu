import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from "@angular/core";

@Component({
  selector: "x-kana-game-input",
  template: `
    <input
      #input
      type="text"
      (input)="onInput(input)"
      (blur)="onBlur(input)"
      (keydown)="onKeyDown($event)"
    />
  `,
  styles: `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;

      input {
        width: 1px;
        height: 1px;
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class KanaGameInput {
  public readonly expectedValue = input.required<string>();
  public readonly focused = input(false);
  public readonly value = model.required<string>();
  public readonly caretPosition = signal<number>(0);

  public readonly back = output<void>();
  public readonly next = output<void>();

  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>("input");

  public constructor() {
    effect(() => {
      if (this.focused()) {
        this.input().nativeElement.focus();
        this.input().nativeElement.value = this.value();
      }
    });
  }

  public focus() {
    this.input().nativeElement.focus();
    this.syncCaret(this.input().nativeElement);
  }

  protected onInput(input: HTMLInputElement) {
    this.value.set(input.value);
  }

  protected syncCaret(input: HTMLInputElement) {
    this.caretPosition.set(
      Math.min(input.selectionStart ?? input.value.length, input.value.length),
    );
  }

  protected onBlur(input: HTMLInputElement) {
    if (this.focused()) {
      input.focus();
    } else {
      input.blur();
    }
  }

  protected onKeyDown(event: KeyboardEvent) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const hasSelection = start !== end;
    const atStart = start === 0 && !hasSelection;
    const atEnd = end === input.value.length && !hasSelection;

    console.log({ start, end, hasSelection, atStart, atEnd });

    if (event.key === "ArrowLeft" && atStart) {
      event.preventDefault();
      this.back.emit();
      return;
    }

    if (event.key === "ArrowRight" && atEnd) {
      event.preventDefault();
      this.next.emit();
      return;
    }

    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      this.next.emit();
      return;
    }

    if (event.key === "Backspace" && atStart) {
      event.preventDefault();
      this.back.emit();
      return;
    }

    window.setTimeout(() => this.syncCaret(input));
  }
}
