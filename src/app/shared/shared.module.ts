import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng.module';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { StatusComponent } from './components/status/status.component';
import { DateStringPipe } from './pipes/date-string.pipe';

const COMPONENTS = [PaginatorComponent, StatusComponent];
const PIPES = [DateStringPipe];
const DIRECTIVES = [];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [CommonModule, PrimeNgModule],
  exports: [...COMPONENTS, ...PIPES, PrimeNgModule],
})
export class SharedModule {}
