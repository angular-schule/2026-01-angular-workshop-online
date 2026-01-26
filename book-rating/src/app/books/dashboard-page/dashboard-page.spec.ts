import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';
import { Mock } from 'vitest';
import { BookStore } from '../shared/book-store';
import { of } from 'rxjs';
import { resource } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let rateUpFn: Mock;

  beforeEach(async () => {
    rateUpFn = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        // Router für den Test bereitstellen
        provideRouter([]),
        // BRH ersetzen: Immer wenn BRH angefordert wird,
        // wird stattdessn unser eigenes Objekt ausgeliefert
        {
          provide: BookRatingHelper,
          useValue: {
            rateUp: rateUpFn
          }
        },
        {
          provide: BookStore,
          // useFactory notwendig, weil Resource einen Injection Context braucht
          useFactory: () => ({
            // Ersatz für Observable-Methode
            getAll: () => of([]),
            // Erdatz für Resource-Methode
            getAllResource: () => resource({
              loader: () => Promise.resolve([])
            })
          })
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // Arrange
    // Testbuch
    const testBook = { isbn: '234' } as Book; // Type Assertion – vorsichtig verwenden!

    // Mock vorbereiten
    rateUpFn.mockReturnValue(testBook);

    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob die Servicemethode rateUp() aufgerufen wurde
    expect(rateUpFn).toHaveBeenCalledExactlyOnceWith(testBook);
  });
});
