import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateStudentRoutingModule } from './create-student-routing.module';
import { CreateStudentComponent } from './create-student.component';
import { NgxsModule } from '@ngxs/store';
import { CreateStudentState } from './state/create-student.state';

@NgModule({
  declarations: [CreateStudentComponent],
  imports: [
    CommonModule,
    CreateStudentRoutingModule,
    NgxsModule.forFeature([CreateStudentState]),
  ],
})
export class CreateStudentModule {}
