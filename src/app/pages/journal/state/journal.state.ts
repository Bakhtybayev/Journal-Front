import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { JournalAction } from './journal.actions';
import { StudentsService } from 'src/app/common/services/students.service';
import { catchError, map } from 'rxjs';
import { StudentModel } from 'src/app/common/modules/Student.model';

export class JournalStateModel {
  public item: StudentModel | null | undefined;
  loading: boolean = true;
  error?: any;
}

@State<JournalStateModel>({
  name: 'journal',
})
@Injectable()
export class JournalState {
  @Selector()
  static state(state: JournalStateModel) {
    return state;
  }

  constructor(private api: StudentsService) {}

  @Action(JournalAction)
  GetJournalAction(
    { patchState }: StateContext<JournalStateModel>,
    { id }: JournalAction
  ) {
    patchState({ loading: true, error: null, item: null });
    return this.api.getStudentById(id).pipe(
      map((request) =>
        patchState({
          item: request,
          loading: false,
        })
      ),
      catchError((error) => {
        patchState({
          loading: false,
          error: error ?? 'Failed to get list',
        });
        throw error;
      })
    );
  }
}
