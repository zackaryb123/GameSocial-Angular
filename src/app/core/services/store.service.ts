import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import {StateInterface} from '../interfaces/state.interface';

const state: StateInterface = {
  user: {},
};

export class StoreService {
  private subject = new BehaviorSubject<StateInterface>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value(): any {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, s: any) {
    this.subject.next({
      ...this.value,
      [name]: s
    });
  }
}
