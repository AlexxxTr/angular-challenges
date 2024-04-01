import { Component, computed, signal } from '@angular/core';

type Difficulty = 'easy' | 'normal';

const Direction = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type DirectionType = (typeof Direction)[keyof typeof Direction];

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('easy')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('normal')">
          Normal
        </button>
      </div>
      <p>Selected Difficulty: {{ difficulty() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="direction.set(Direction.LEFT)">
          Left
        </button>
        <button mat-stroked-button (click)="direction.set(Direction.RIGHT)">
          Right
        </button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: `
    section {
      @apply mx-auto my-5 flex w-fit flex-col items-center gap-2;

      > div {
        @apply flex w-fit gap-5;
      }
    }

    button {
      @apply rounded-md border px-4 py-2;
    }
  `,
})
export class AppComponent {
  readonly difficulty = signal<Difficulty>('easy');

  readonly Direction = Direction;
  readonly direction = signal<DirectionType | undefined>(undefined);

  readonly directionLabel = computed<string>(() =>
    this.direction()
      ? `You chose to go ${this.direction()}`
      : 'Choose a direction',
  );
}
