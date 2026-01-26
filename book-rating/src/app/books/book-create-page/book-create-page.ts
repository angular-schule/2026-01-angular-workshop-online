import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { form, FormField } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-create-page',
  imports: [FormField, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
})
export class BookCreatePage {
  #bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: []
  });

  protected readonly bookForm = form(this.#bookFormData);

}
