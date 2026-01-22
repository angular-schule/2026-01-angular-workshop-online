import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCard } from './book-card';
import { inputBinding, outputBinding } from '@angular/core';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings: [
        inputBinding('book', () => ({
          isbn: '',
          title: '',
          description: '',
          rating: 3,
          price: 5,
          authors: []
        })),
        // outputBinding('rateUp', (b: Book) => {})
      ]
    });
    component = fixture.componentInstance;

    // DOM-Element
    // fixture.nativeElement.querySelector('h2')

    // warten, bis Rendern abgeschlossen ist
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
