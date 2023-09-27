import { Component, Input } from '@angular/core';
import { StudentsState, StudentsStateModel } from './state/students.state';
import { Select, Store } from '@ngxs/store';
import { StudentsAction } from './state/students.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { JournalComponent } from '../journal/journal.component';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  @Select(StudentsState.state) state$?: Observable<StudentsStateModel>;
  rows = 10;
  queryParams: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.store.dispatch(new StudentsAction(''));
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

    // this.getData();
  }

  onOpenJournal(studentId: number) {
    this.dialogService.open(JournalComponent, {
      data: {
        id: studentId,
      },
      header: 'Update student journal',
      width: '50%',
      height: '100%',
      dismissableMask: true,
    });
  }
}
