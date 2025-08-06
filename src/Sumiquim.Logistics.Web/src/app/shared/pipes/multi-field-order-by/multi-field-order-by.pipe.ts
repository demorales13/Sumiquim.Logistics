import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFieldOrderBy'
})
export class MultiFieldOrderByPipe implements PipeTransform {

  transform<T>(array: T[], fields: string[] | string, reverse: boolean = false): T[] {
    if (!Array.isArray(array) || !fields) return array;

    const sortFields = Array.isArray(fields) ? fields : [fields];

    return [...array].sort((a, b) => {
      for (let field of sortFields) {
        const valA = (a as any)[field] ?? '';
        const valB = (b as any)[field] ?? '';

        // Comparar números
        if (!isNaN(Number(valA)) && !isNaN(Number(valB))) {
          if (+valA < +valB) return reverse ? 1 : -1;
          if (+valA > +valB) return reverse ? -1 : 1;
        }
        // Comparar strings
        else {
          const comp = String(valA).localeCompare(String(valB), 'es', { sensitivity: 'base' });
          if (comp !== 0) return reverse ? -comp : comp;
        }
      }
      return 0;
    });
  }
}
