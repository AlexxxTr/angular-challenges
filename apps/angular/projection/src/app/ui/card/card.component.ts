import { CommonModule } from '@angular/common';
import { Component, TemplateRef, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.backgroundColor]="backgroundColor()">
      <ng-container *ngTemplateOutlet="headerTpl()" />

      <section>
        @for (item of list(); track item.id) {
          <app-list-item
            [id]="item.id"
            [name]="item.firstName"
            (delete)="delete.emit($event)" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ListItemComponent],
})
export class CardComponent<T extends { id: number; firstName: string }> {
  list = input<T[]>([]);
  backgroundColor = input<string>('');

  headerTpl = input.required<TemplateRef<unknown>>();

  delete = output<number>();
  add = output<void>();
}
