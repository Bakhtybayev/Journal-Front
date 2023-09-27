import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { StudentsState } from './pages/students/state/students.state';
import { StudentsService } from './common/services/students.service';
import { JournalState } from './pages/journal/state/journal.state';
import { JournalComponent } from './pages/journal/journal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [AppComponent, JournalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([StudentsState, JournalState], {
      developmentMode: true,
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [StudentsService, DialogService, MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
