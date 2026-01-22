export interface Book {
  isbn: string;
  title: string;
  description: string;
  authors: string[];
  price: number;
  rating: number;
}

/* Warum Interfaces+Rohdaten statt Klassen?
- 1. JSON-(De)Serialisierung
- 2. Immutability: Klonen geht mit Plain Objects einfacher
*/
