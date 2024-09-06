import { Observable } from 'rxjs';
import { concatMap, of, delay } from 'rxjs';

export function simulateNetworkLatency<T>(delayTime: number) {
  return (source: Observable<T>): Observable<T> => {
    return source.pipe(
      concatMap(value => of(value).pipe(delay(delayTime)))
    );
  };
}
