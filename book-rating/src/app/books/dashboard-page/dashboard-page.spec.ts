import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';
import { Mock } from 'vitest';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let rateUpMock: Mock;

  beforeEach(async () => {
    rateUpMock = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        // BRH ersetzen: Immer wenn BRH angefordert wird,
        // wird stattdessn unser eigenes Objekt ausgeliefert
        {
          provide: BookRatingHelper,
          useValue: {
            rateUp: rateUpMock
          }
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
    rateUpMock.mockReturnValue(testBook);

    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob die Servicemethode rateUp() aufgerufen wurde
    expect(rateUpMock).toHaveBeenCalledExactlyOnceWith(testBook);
  });
});
