import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { JournalComponent } from './pages/journal/journal.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'students',
  },
  {
    path: 'students',
    data: { title: 'Students' },
    component: StudentsComponent,
  },
  {
    path: 'create-student',
    data: { title: 'Create student' },
    component: CreateStudentComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'students',
        data: { title: 'Students' },
        loadChildren: () =>
          import('./pages/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'create-student',
        data: { title: 'Create student' },
        loadChildren: () =>
          import('./pages/create-student/create-student.module').then(
            (m) => m.CreateStudentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
