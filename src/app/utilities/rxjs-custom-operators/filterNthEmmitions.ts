import { Observable } from 'rxjs';
import { filter} from 'rxjs/operators';

export function filterByIndex<T>(predicate: (index: number) => boolean) {
  return (source: Observable<T>): Observable<T> => {
    let index = 0;
    return source.pipe(
      filter(() => predicate(index++))
    );
  };
}
