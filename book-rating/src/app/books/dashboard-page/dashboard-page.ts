import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from "../book-card/book-card";
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  #ratingHelper = inject(BookRatingHelper);
  #store = inject(BookStore);
  #destroyRef = inject(DestroyRef);

  // protected readonly books = signal<Book[]>([]);
  protected readonly books = this.#store.getAllResource();

  protected readonly currentDate = signal(Date.now());

  constructor() {
    /*this.#store.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/

    // Intervall für Datumsaktualisierung
    const dateInterval = setInterval(() => {
      this.currentDate.set(Date.now());
      // console.log(this.currentDate());
    }, 1000);

    // Callback wird ausgeführt, wenn Komponente zerstört wird.
    // Das ist die moderne Alternative zu `ngOnDestroy()`.
    this.#destroyRef.onDestroy(() => clearInterval(dateInterval));
  }

  doRateUp(book: Book): void {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book): void {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  doDeleteBook(book: Book): void {
    if (!confirm(`Buch "${book.title}" wirklich löschen?`)) {
      return;
    }

    this.#store.delete(book.isbn).subscribe(() => {
      // this.books.reload();
      this.books.update(oldList => oldList.filter(b => b.isbn !== book.isbn));
    });
  }

  #updateList(ratedBook: Book): void {
    // [1,2,3,4,5,6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]
    // [1,2,3,4,5,6].filter(e => e % 2 === 0) // [2,4,6]
    // Aufgabe: das neue Buch in die Liste einfügen
    this.books.update(oldList => {
      return oldList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        }

        return b;
      });
    });
  }

}
