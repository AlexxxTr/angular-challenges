import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [headerTpl]="header"
      (add)="add()"
      (delete)="delete($event)"
      backgroundColor="rgba(250, 0, 0, 0.1)"></app-card>

    <ng-template #header>
      <img src="assets/img/teacher.png" width="200px" />
    </ng-template>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers$ = this.http.fetchTeachers$.pipe(
    tap((teachers) => this.store.addAll(teachers)),
    switchMap(() => this.store.teachers$),
  );
  teachers = toSignal(this.teachers$, { initialValue: [] });

  add() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
