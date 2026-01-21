import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


///////////////////////////////////////

export class Customer {
  // private id: number; // TS
  #id: number; // JS
  abc: string = '';

  constructor(theId: number) {
    this.#id = theId;
  }

  foobar(arg: string): number {
    setTimeout(() => {
      console.log('ghdfjghfd', this.#id)
    }, 2000)
    return 6;
  }
}

export const myCustomer = new Customer(4);


///////////////////




[1,2,3,4,5,6].forEach(arg => arg + 1)





export function abcde(arg: number) {
  return arg + 1;
}

// Lambda-Ausdruck
// Arrow-Funktion
const foo2 = (arg: number) => arg + 1;

const foo3 = arg => arg + 1;





const result = foo(5);
