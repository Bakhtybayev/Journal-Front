import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreateStudentAction } from './create-student.actions';

export class CreateStudentStateModel {
  public items: any;
  loading: boolean = true;
  total: number = 0;
  page: number = 1;
  count: number = 10;
  error?: any;
}

@State<CreateStudentStateModel>({
  name: 'CreateStudent',
  defaults: {
    items: [],
    loading: false,
    total: 0,
    page: 1,
    count: 10,
    error: null,
  },
})
@Injectable()
export class CreateStudentState {
  @Selector()
  static state(state: CreateStudentStateModel) {
    return state;
  }

  constructor() {}

  @Action(CreateStudentAction)
  GetCreateStudentAction(
    { patchState }: StateContext<CreateStudentStateModel>,
    { params }: CreateStudentAction
  ) {
    patchState({ loading: true, error: null, items: null });
    return;
    // this.api.List({ ...params }).pipe(
    //   map((request) =>
    //     patchState({
    //       items: request.data,
    //       total: request.total,
    //       page: params.page,
    //       count: params.count,
    //       loading: false,
    //     })
    //   ),
    //   catchError((error) => {
    //     patchState({
    //       loading: false,
    //       error: this.eH.getErrorText('Failed to get list', error),
    //     });
    //     throw error;
    //   })
    // );
  }
}
