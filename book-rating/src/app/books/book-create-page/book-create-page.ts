import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { form, FormField, max, maxLength, min, minLength, pattern, provideSignalFormsConfig, required, validate } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create-page',
  imports: [FormField, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        // CSS-Klasse "invalid" wird auf DOM-Element angewendet, wenn Bedingung erfüllt ist
        invalid: (field) => field.state().touched() && field.state().invalid()
      }
    })
  ]
})
export class BookCreatePage {
  #store = inject(BookStore);
  #router = inject(Router);

  // Datenmodell
  #bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: []
  });

  // Formularmodell
  protected readonly bookForm = form(this.#bookFormData, path => {
    // Schema
    required(path.isbn, { message: 'ISBN is required.' });
    minLength(path.isbn, 10, { message: 'ISBN must be min. 10 chars.' });
    maxLength(path.isbn, 13, { message: 'ISBN must be max. 13 chars.' });
    pattern(path.isbn, /^\d+$/, { message: 'ISBN must only contain numbers.' });

    validate(path.isbn, ctx => {
      if (!ctx.value().startsWith('978')) {
        return { kind: 'isbnprefix', message: 'ISBN must start with 978.' };
      }
      return;
    });

    required(path.title, { message: 'Title is required.' });
    maxLength(path.title, 80, { message: 'Title must not be longer than 80 chars.' });
    required(path.price, { message: 'Price is required.' });

    required(path.rating, { message: 'Rating is required' });
    min(path.rating, 1, { message: 'Rating must in range of 1...5' });
    max(path.rating, 5, { message: 'Rating must in range of 1...5' });
  });

  submitForm() {
    // prüfen, ob das Formular überhaupt gültig ist
    if (this.bookForm().invalid()) {
      // TODO: alle Felder als touched markieren
      return false;
    }

    // Buch erzeugen aus den Formulardaten
    // const newBook = this.#bookFormData();
    const newBook = this.bookForm().value();

    // BookStore.create() HTTP
    this.#store.create(newBook).subscribe(createdBook => {
      this.#router.navigate(['/books', createdBook.isbn]);
    });


    // wegnavigieren zur Detailseite
    // alternativ: Formular zurücksetzen

    return false; // prevent reload
  }

}
