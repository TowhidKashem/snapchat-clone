/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loadApp(): Chainable<void>;
    getLastMessage(getAuthor?: boolean): Chainable<Element>;
  }
}
