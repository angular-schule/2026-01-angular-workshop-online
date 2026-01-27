import { Component, inject, input, signal } from '@angular/core';
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
  #store = inject(BookStore);
  readonly isbn = input.required<string>();
  protected readonly book = this.#store.getSingleResource(() => this.isbn());
}


/*
TODO Detailseite
- BookStore HTTP: einzelnes Buch abrufen
- Buch anzeigen

*/
