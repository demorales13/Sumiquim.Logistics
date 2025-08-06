import { Pipe, PipeTransform } from '@angular/core';

const FILES_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'PB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

@Pipe({
  name: 'monthsCount'
})
export class MonthsCountPipe implements PipeTransform {

  transform(value: number): string {

    var text = "meses";

    if(value == 1) {
      text = "mes";
    }

    return `+${value} ${text}`;
  }

}
