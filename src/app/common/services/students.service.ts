import { Injectable } from '@angular/core';
import { StudentModel } from '../modules/Student.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentDataModel } from '../modules/StudentData.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private static rotUrl = 'http://localhost:9191/';
  static readonly studentsRootUrl = 'students';

  constructor(private http: HttpClient) {}

  getStudents(params?: {
    page?: number;
    count?: number;
  }): Observable<StudentDataModel> {
    return this.http
      .get<StudentDataModel>('http://localhost:9191/students', {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(
        // filter((response: any) => response instanceof HttpResponse),
        map((response: StudentDataModel) => {
          return response;
        })
      );
  }

  getStudentById(id: number): Observable<StudentModel> {
    return this.http
      .get<StudentModel>(`http://localhost:9191/studentById/${id}`)
      .pipe(
        map((response: StudentModel) => {
          return response;
        })
      );
  }

  updateStudent(student: StudentModel): Observable<StudentModel> {
    const headers = new HttpHeaders();

    return this.http
      .put<StudentModel>(`http://localhost:9191/update-student`, student, {
        headers,
      })
      .pipe(
        map((response: StudentModel) => {
          return response;
        })
      );
  }
}
