import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #store = inject(BookStore);
  protected readonly book = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH
    // TODO: Verschachtelte Subscriptions vermeiden, vor allem wegen Race Condition
    this.#route.paramMap.subscribe(params => {
      // Im Zweifel bitte if-Abfrage oder Fallback verwenden
      const isbn = params.get('isbn')!; // Non-Null Assertion, bitte vorsichtig verwenden!
      this.#store.getSingle(isbn).subscribe(book => {
        this.book.set(book);
      });
    });
  }

}


/*
TODO Detailseite
- BookStore HTTP: einzelnes Buch abrufen
- Buch anzeigen

*/
