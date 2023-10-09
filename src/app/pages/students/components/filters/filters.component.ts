import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { StudentDataModel } from 'src/app/common/modules/StudentData.model';
import {
  FacultyTypes,
  GenderTypes,
  SemesterTypes,
} from 'src/app/common/modules/StudentStateTypes.model';
import { StudentsService } from 'src/app/common/services/students.service';
import { FilteredStudentsAction } from '../../state/students.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  students?: StudentDataModel;
  toDate = new Date();
  fromDate = new Date();
  form?: FormGroup;
  submitted = true;
  semesters = Object.entries(SemesterTypes).map(([value, text]) => ({
    label: value,
    value: text,
  }));
  genders = Object.entries(GenderTypes).map(([value, text]) => ({
    label: value,
    value: text,
  }));
  facultys = Object.entries(FacultyTypes).map(([value, text]) => ({
    label: text,
    value: text,
  }));
  assessments = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];

  statuses?: any;

  filterForm = 'short';
  toogleFilterForm() {
    if (this.filterForm == 'short') {
      this.filterForm = 'full';
    } else {
      this.filterForm = 'short';
    }
  }

  constructor(
    private fb: FormBuilder,
    private api: StudentsService,
    private store: Store,
    private route: ActivatedRoute
  ) {
    // this.statuses = Object.entries(OrderStatus).map(([value, text]) => ({
    //   label: value,
    //   value: text,
    // }));
  }

  ngOnInit() {
    this.onGenerateFormValues();
  }

  async onSearch() {
    this.submitted = true;
    this.form?.disable();
    for (const [key, value] of Object.entries(this.form?.value)) {
      if (!value) {
        this.form?.removeControl(`${key}`);
      }
    }
    let params = { ...this.form?.value };
    await firstValueFrom(this.api.getStudents({ ...params }))
      .then((response) => {
        const page = this.route.snapshot.queryParams['page'] ?? 1;
        this.store.dispatch(
          new FilteredStudentsAction({ students: response, page })
        );
        this.onGenerateFormValues();
      })
      .catch((error) => {
        this.onGenerateFormValues();
      });
    this.form?.enable();
    this.submitted = false;
  }

  onReset() {
    this.form?.reset();
  }

  onGenerateFormValues() {
    this.form = this.fb.group({
      // id: this.fb.control(this.studentId),
      studentName: this.fb.control(this.form?.value?.studentName ?? null),
      lastname: this.fb.control(this.form?.value?.lastname ?? null),
      studentFrom: this.fb.control(this.form?.value?.studentFrom ?? null),
      email: this.fb.control(this.form?.value?.email ?? null),
      phone: this.fb.control(this.form?.value?.phone ?? null),
      gender: this.fb.control(this.form?.value?.gender ?? null),
      faculty: this.fb.control(this.form?.value?.faculty ?? null),
      assessment: this.fb.control(this.form?.value?.assessment ?? null),
      semester: this.fb.control(this.form?.value?.semesters ?? null),
      educationStartYear: this.fb.control(
        this.form?.value?.educationStartYear ?? null
      ),
      educationEndYear: this.fb.control(
        this.form?.value?.educationEndYear ?? null
      ),
    });
  }
}
