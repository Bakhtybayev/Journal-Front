import { Injectable } from '@angular/core';
import { StudentModel } from '../modules/Student.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentDataModel } from '../modules/StudentData.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private static rootUrl = 'http://localhost:9191/';
  static readonly getStudentRootUrl = 'get-student/';
  static readonly getStudentsRootUrl = 'get-students';
  static readonly createStudentRootUrl = 'create-student';
  static readonly updateStudentRootUrl = 'update-student/';
  static readonly deleteStudentRootUrl = 'delete-student/';
  static readonly createStudentsRootUrl = 'create-students';

  constructor(private http: HttpClient) {}

  getStudents(params?: {
    name: string;
    lastname: string;
    from: string;
    semester: string;
    email: string;
    phone: string;
    gender: string;
    faculty: string;
    assessment: string;
    educationStartYear: string;
    educationEndYear: string;
    page?: number;
    count?: number;
  }): Observable<StudentDataModel> {
    console.log(11111);
    console.log(params);
    return this.http
      .get<StudentDataModel>(
        StudentsService.rootUrl + StudentsService.getStudentsRootUrl,
        {
          params,
          headers: {
            Accept: 'application/json',
          },
        }
      )
      .pipe(
        // filter((response: any) => response instanceof HttpResponse),
        map((response: StudentDataModel) => {
          return response;
        })
      );
  }

  getStudent(id: number): Observable<StudentModel> {
    return this.http
      .get<StudentModel>(
        StudentsService.rootUrl + StudentsService.getStudentRootUrl + id
      )
      .pipe(
        map((response: StudentModel) => {
          return response;
        })
      );
  }

  updateStudent(student: StudentModel): Observable<StudentModel> {
    const headers = new HttpHeaders();

    return this.http
      .put<StudentModel>(
        StudentsService.rootUrl + StudentsService.updateStudentRootUrl,
        student,
        {
          headers,
        }
      )
      .pipe(
        map(() => {
          return {
            status: 'Student successfully updated',
            updatedStudentId: student.id,
            updatedDate: new Date(),
          } as any;
        })
      );
  }

  createStudent(student: StudentModel): Observable<StudentModel> {
    const headers = new HttpHeaders();

    return this.http
      .post<StudentModel>(
        StudentsService.rootUrl + StudentsService.createStudentRootUrl,
        student,
        {
          headers,
        }
      )
      .pipe(
        map(() => {
          return {
            status: 'Student successfully created',
            createdStudentId: student.id,
            createdDate: new Date(),
          } as any;
        })
      );
  }

  deleteStudent(id: number): Observable<StudentModel> {
    // const headers = new HttpHeaders();

    return this.http
      .delete<StudentModel>(
        StudentsService.rootUrl + StudentsService.deleteStudentRootUrl + id
      )
      .pipe(
        map(() => {
          return {
            status: 'Student successfully deleted',
            deletedStudentId: id,
            deletedDate: new Date(),
          } as any;
        })
      );
  }
}
