import { Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

export function countEmissions<T>() {
  return (source: Observable<T>): Observable<[T, number]> => {
    return source.pipe(
      scan((acc, value) => [...acc, value], [] as T[]),
      map((acc) => [acc[acc.length - 1], acc.length] as [T, number])
    );
  };
}
