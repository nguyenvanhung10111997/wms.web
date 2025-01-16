import { AfterViewInit, Injectable, OnDestroy } from '@angular/core';
import { SubSink } from './sub-sink';
import { Subject } from 'rxjs';

/**
 * A class that automatically unsubscribes all observables when the object gets destroyed
 */
@Injectable()
export class UnsubscribeOnDestroyAdapter implements OnDestroy {
  /**
   * The subscription sink object that stores all subscriptions
   */
  subs = new SubSink();
  destroy$ = new Subject<void>();

  /**
   * The lifecycle hook that unsubscribes all subscriptions when the component / object gets destroyed
   */
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
