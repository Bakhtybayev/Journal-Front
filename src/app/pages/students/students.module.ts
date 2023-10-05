import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { NgxsModule } from '@ngxs/store';
import { StudentsState } from './state/students.state';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { JournalComponent } from './components/journal/journal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [StudentsComponent, JournalComponent, FiltersComponent],
  imports: [
    PaginatorModule,
    CommonModule,
    StudentsRoutingModule,
    SkeletonModule,
    SharedModule,
    // ButtonModule,
    NgxsModule.forFeature([StudentsState]),
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService],
  // schemas: [NO_ERRORS_SCHEMA],
})
export class StudentsModule {}
