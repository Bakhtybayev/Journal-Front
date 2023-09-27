import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { StudentsAction } from './students.actions';
import { StudentsService } from 'src/app/common/services/students.service';
import { catchError, map } from 'rxjs';
import { StudentModel } from 'src/app/common/modules/Student.model';
import { StudentDataModel } from 'src/app/common/modules/StudentData.model';

export class StudentsStateModel {
  public items?: StudentModel[] | null | undefined;
  loading: boolean = true;
  total: number = 0;
  page: number = 1;
  count: number = 10;
  error?: any;
}

@State<StudentsStateModel>({
  name: 'students',
  defaults: {
    loading: false,
    total: 0,
    page: 1,
    count: 10,
    error: null,
  },
})
@Injectable()
export class StudentsState {
  @Selector()
  static state(state: StudentsStateModel) {
    return state;
  }

  constructor(private api: StudentsService) {}

  @Action(StudentsAction)
  GetStudentsAction(
    { patchState }: StateContext<StudentsStateModel>,
    { params }: StudentsAction
  ) {
    patchState({ loading: true, error: null, items: null });
    return this.api.getStudents({ ...params }).pipe(
      map((request: StudentDataModel) => {
        return patchState({
          items: request.data,
          total: request.total,
          page: params.page,
          count: params.count,
          loading: false,
        });
      }),
      catchError((error) => {
        patchState({
          loading: false,
          error: 'Failed to get list',
        });
        throw error;
      })
    );
  }
}
