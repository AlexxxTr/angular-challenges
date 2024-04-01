import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<T extends (...args: Parameters<T>) => ReturnType<T>>(
    value: T,
    ...args: Parameters<T>
  ): ReturnType<T> {
    return value(...args);
  }
}
