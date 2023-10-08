import { Component } from '@angular/core';
import { StudentsState, StudentsStateModel } from './state/students.state';
import { Select, Store } from '@ngxs/store';
import { StudentsAction } from './state/students.actions';
import { Observable, firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JournalComponent } from './components/journal/journal.component';
import { StudentsService } from 'src/app/common/services/students.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [DynamicDialogRef],
})
export class StudentsComponent {
  @Select(StudentsState.state) state$?: Observable<StudentsStateModel>;
  rows = 10;
  queryParams: any;
  submitted = false;

  constructor(
    private store: Store,
    private router: Router,
    private api: StudentsService,
    private route: ActivatedRoute,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getStudentsData();
  }

  async paginate(event: LazyLoadEvent) {
    const { first, rows } = event;
    const pageIndex = Math.ceil((first as number) / (rows as number)) + 1;
    const params = {
      ...this.queryParams,
      page: pageIndex,
      count: rows,
    };
    this.rows = rows as number;

    await this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });

    this.getStudentsData();
  }

  getStudentsData() {
    const page = this.route.snapshot.queryParams['page'] ?? 1;
    const count = this.route.snapshot.queryParams['count'] ?? 10;
    this.store.dispatch(new StudentsAction({ page, count }));
  }

  onOpenJournal(studentId?: number) {
    this.dialogService.open(JournalComponent, {
      data: {
        id: studentId,
      },
      header: studentId ? 'Update student journal' : 'Create student',
      width: '50%',
      height: '100%',
      dismissableMask: true,
    });
  }

  onDeleteStudentConfirmation(studentId: number) {
    this.confirmService.confirm({
      key: 'dialog',
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.onDeleteStudent(studentId),
      reject: () => ({}),
    });
  }

  onDeleteStudent(studentId: number) {
    firstValueFrom(this.api.deleteStudent(studentId))
      .then((res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student deleted',
          });
          this.submitted = false;
          this.store.dispatch(new StudentsAction(''));
        }
      })
      .catch((error) => {
        this.submitted = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error occured',
        });
        throw error;
      });
  }
}
