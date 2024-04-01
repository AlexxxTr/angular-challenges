import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({
  name: 'util',
  standalone: true,
})
export class UtilPipe implements PipeTransform {
  transform<T extends keyof typeof PersonUtils>(
    utilName: T,
    ...args: Parameters<(typeof PersonUtils)[T]>
  ): ReturnType<(typeof PersonUtils)[T]> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (PersonUtils[utilName] as Function)(...args);
  }
}
