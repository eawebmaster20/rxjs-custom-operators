import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export function multiplyBy(factor: number) {
  return (source: Observable<any>): Observable<number> => {
    return source.pipe(
      filter((value: any) => typeof value === 'number'), 
      map((value: number) => value * factor) 
    );
  };
}
