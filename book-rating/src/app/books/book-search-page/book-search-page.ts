import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { debounceTime, distinctUntilChanged, EMPTY, filter, of, Subject, switchMap } from 'rxjs';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-book-search-page',
  imports: [FormField],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss',
})
export class BookSearchPage {
  protected readonly searchTerm = signal('');
  protected readonly searchForm = form(this.searchTerm);

  #bookStore = inject(BookStore);

  protected readonly results = toSignal(toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => {
      if (term.length >= 3) {
        return this.#bookStore.search(term);
      } else {
        return of([]);
      }
    })
  ), { initialValue: [] })
}

/*
leerer Suchbegriff: leere Liste
ab 3 Zeichen: echte Suche
*/
