import { InjectionToken } from '@angular/core';

export const TIMER = new InjectionToken<number>('TIMER', {
  factory: () => 1_000,
  providedIn: 'root',
});
