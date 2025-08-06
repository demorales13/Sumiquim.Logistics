import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(items: any[], field: string, isDescending: boolean = false): any[] {
    if (!items || !field) {
      return items;
    }
    return items.sort((a, b) => {
      if (a[field] < b[field]) {
        return isDescending ? 1 : -1;
      }
      if (a[field] > b[field]) {
        return isDescending ? -1 : 1;
      }
      return 0;
    });
  }

}
