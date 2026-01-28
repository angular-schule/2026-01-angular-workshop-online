import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { Book } from '../shared/book';
import { catchError, EMPTY, filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #store = inject(BookStore);

  protected readonly book = toSignal(this.#route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    switchMap(isbn => this.#store.getSingle(isbn).pipe(
      catchError(err => {
        // Fehler ausgeben
        console.log(err);
        return EMPTY;
      })
    ))
  ));
}
