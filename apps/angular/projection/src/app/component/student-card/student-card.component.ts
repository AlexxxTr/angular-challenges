import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [headerTpl]="header"
      (add)="add()"
      (delete)="delete($event)"
      backgroundColor="rgba(0, 250, 0, 0.1)"></app-card>

    <ng-template #header>
      <img src="assets/img/student.webp" width="200px" />
    </ng-template>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students$ = this.http.fetchStudents$.pipe(
    tap((students) => this.store.addAll(students)),
    switchMap(() => this.store.students$),
  );
  students = toSignal(this.students$, { initialValue: [] });

  add() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
