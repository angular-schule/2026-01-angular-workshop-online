import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Berlin', 'München', 'Bern', 'Thun', 'Zürich')
    // from([1,2,3,4,5,6])
    // interval(1000)        // ---0---1---2---3---4---5 ...
    // timer(3000)           // -----------0|
    // timer(3000, 1000)     // -----------0---1---2---3---4---5 ...
    // timer(1000, 1000)     // ---0---1---2---3---4---5 ...
    // timer(0, 1000)        // 0---1---2---3---4---5 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });




    /******************************/
    // Producer: führt Aktionen aus und generiert Werte,
    // die über Callbacks an den Observer vermittelt werden
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);

      setTimeout(() => sub.next(1000), 2000)
      setTimeout(() => sub.next(2000), 4000)
      setTimeout(() => sub.complete(), 6000)
    }

    // Observer: empfängt und verarbeitet die Daten
    const obs: Observer<number> = {
      next: e => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG'),
    }


    // producer(obs);
    // Observable: Schnittstelle zwischen Producer und Observer
    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);

    // Finnische Notation $
    const myObs2$ = new Observable<string>(sub => {
      sub.next('Hallo');
      sub.complete();
    })


    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
