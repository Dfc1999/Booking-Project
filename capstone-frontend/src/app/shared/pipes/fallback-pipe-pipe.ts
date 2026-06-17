import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackPipe'
})
export class FallbackPipe implements PipeTransform {
  transform(value: string | undefined, fallback: string = 'N/A'): string {
    return value && value.trim() ? value : fallback;
  }
}
