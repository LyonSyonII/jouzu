import { Pipe, PipeTransform } from "@angular/core";
import { romanize } from "@shared/japanese";

@Pipe({ name: 'romanize', standalone: true })
export class RomanizePipe implements PipeTransform {
  transform(value: string): string {
    return romanize(value);
  }
}