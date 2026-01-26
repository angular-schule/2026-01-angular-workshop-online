import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH
    this.#route.paramMap.subscribe(params => {
      // Im Zweifel bitte if-Abfrage oder Fallback verwenden
      const isbn = params.get('isbn')!; // Non-Null Assertion, bitte vorsichtig verwenden!
      console.log(isbn);
    });
  }

}


/*
TODO Detailseite
- BookStore HTTP: einzelnes Buch abrufen
- Buch anzeigen

*/
