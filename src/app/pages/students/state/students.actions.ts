export class StudentsAction {
  static readonly type = '[Students] GetStudentsAction';
  constructor(public params: any) {}
}

export class FilteredStudentsAction {
  static readonly type = '[Students] GetFilteredStudentsAction';
  constructor(public items: any) {}
}
