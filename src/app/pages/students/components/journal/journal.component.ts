import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentsService } from 'src/app/common/services/students.service';
import { MessageService } from 'primeng/api';
import { StudentModel } from 'src/app/common/modules/Student.model';
import { Store } from '@ngxs/store';
import { StudentsAction } from '../../state/students.actions';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent {
  student?: StudentModel;
  form?: FormGroup;
  studentId?: number;
  types = [{ label: 'Me', value: 'You' }];
  submitted = false;
  loading = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private api: StudentsService,
    private messageService: MessageService,
    private store: Store
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.studentId = this.dialogConfig.data?.id;
    if (this.studentId) {
      await firstValueFrom(this.api.getStudent(this.studentId))
        .then((response) => {
          this.student = response;
          this.loading = false;
        })
        .catch((error) => {
          this.submitted = false;
          this.loading = false;
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: 'Failed to get student details',
          });
          throw error;
        });
    }

    this.form = this.fb.group({
      id: this.fb.control(this.studentId),
      name: this.fb.control(this.student?.name ?? null, [Validators.required]),
      lastname: this.fb.control(this.student?.lastname ?? null, [
        Validators.required,
      ]),
      from: this.fb.control(this.student?.from ?? null, [Validators.required]),
      email: this.fb.control(this.student?.email ?? null, [
        Validators.required,
      ]),
      phone: this.fb.control(this.student?.phone ?? null, [
        Validators.required,
      ]),
      gender: this.fb.control(this.student?.gender ?? null, [
        Validators.required,
      ]),
      faculty: this.fb.control(this.student?.faculty ?? null, [
        Validators.required,
      ]),
      assessment: this.fb.control(this.student?.assessment ?? null, [
        Validators.required,
      ]),
      semester: this.fb.control(this.student?.semester ?? null, [
        Validators.required,
      ]),
      educationStartYear: this.fb.control(
        this.student?.educationStartYear ?? null,
        [Validators.required]
      ),
      educationEndYear: this.fb.control(
        this.student?.educationEndYear ?? null,
        [Validators.required]
      ),
    });
    this.loading = false;
  }

  submit() {
    this.submitted = true;
    const body = { ...this.form?.value };
    if (this.studentId) this.form?.removeControl('id');

    const requestBody = this.studentId
      ? this.api.updateStudent(body)
      : this.api.createStudent(body);

    firstValueFrom(requestBody)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.studentId ? 'Journal updated' : 'Journal created',
        });
        this.submitted = false;
        this.dialogRef.close();
        this.store.dispatch(new StudentsAction(''));
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
