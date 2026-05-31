import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  viewChild,
} from "@angular/core";

import { InputText } from "primeng/inputtext";

@Component({
  selector: "x-kana-game-input",
  template: `
    <input
      pInputText
      #input
      type="text"
      autocomplete="off"
      autocapitalize="none"
      spellcheck="false"
      [value]="value()"
      [style.width.ch]="inputSize()"
      [attr.maxlength]="inputSize()"
      [placeholder]="value() ? '' : '_'"
      [tabIndex]="focused() ? 0 : -1"
      (input)="onInput(input)"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (click)="onClick()"
      (keydown)="onKeyDown($event)"
    />
  `,
  styles: `
    :host {
      display: inline-block;
      min-width: 1ch;
      line-height: inherit;
      vertical-align: baseline;
    }

    input {
      box-sizing: content-box;
      min-width: 1ch;
      border: 0;
      padding: 0.05em 0.08em;
      color: inherit;
      font: inherit;
      line-height: inherit;
      text-align: center;
      caret-color: currentColor;
      vertical-align: baseline;
    }

    input::placeholder {
      color: currentColor;
      opacity: 1;
    }
  `,
  host: {
    class: "kana-romaji",
    "[style.color]": "color()",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText],
})
export class KanaGameInput {
  public readonly expectedValue = input.required<string>();
  public readonly value = model.required<string>();
  public readonly focused = input(false);
  public readonly color = input<string | undefined>();

  public readonly back = output<void>();
  public readonly focusRequested = output<void>();
  public readonly next = output<void>();

  protected readonly inputSize = computed(() =>
    Math.max(this.expectedValue().length, 1) + 0.2,
  );

  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>("input");

  public constructor() {
    afterRenderEffect({
      write: () => {
        const input = this.input().nativeElement;
        if (this.focused()) {
          this.focus();
        } else {
          input.blur();
        }
      },
    });
  }

  public focus() {
    this.input().nativeElement.focus({ preventScroll: true });
  }

  protected onInput(input: HTMLInputElement) {
    const prev = this.value();
    this.value.set(input.value);
    if (prev.length < input.value.length && input.value.length === this.expectedValue().length) {
      this.next.emit();
    }
  }

  protected onFocus() {
    if (!this.focused()) {
      this.focusRequested.emit();
    }
  }

  protected onBlur() {
    if (this.focused()) {
      this.focus();
    }
  }

  protected onClick() {
    if (!this.focused()) {
      this.focusRequested.emit();
    }
  }

  protected onKeyDown(event: KeyboardEvent) {
    const input = event.currentTarget as HTMLInputElement;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const hasSelection = start !== end;
    const atStart = start === 0 && !hasSelection;
    const atEnd = end === input.value.length && !hasSelection;

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
  }
}
