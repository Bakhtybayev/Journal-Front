import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
@Pipe({ name: 'dateString' })
export class DateStringPipe implements PipeTransform {
  transform(
    value: Date | string | undefined,
    format: 'date' | 'time' | 'seconds' | any = 'date'
  ): any {
    if (!value) return '';

    let date =
      typeof value == 'object'
        ? DateTime.fromJSDate(value)
        : DateTime.fromISO(value);

    if (!date.isValid) return '';

    if (format != 'date') {
      if (format != 'time' && format != 'seconds') {
        return date.toFormat(format);
      }

      return date.toFormat(`D ${format == 'time' ? 'T' : 'TT'}`);
    }
    // let date = new Date();

    return date.toFormat(`D`);
    // return date;
  }
}
