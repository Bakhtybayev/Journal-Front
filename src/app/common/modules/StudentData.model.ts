import { StudentModel } from './Student.model';

export interface StudentDataModel {
  data: Array<StudentModel>;
  total: number;
}
