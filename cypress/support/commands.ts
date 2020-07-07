// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

///<reference path="./index.d.ts"/>

Cypress.Commands.add('loadApp', () => {
  cy.visit('https://localhost:3000/');
});

Cypress.Commands.add('getLastMessage', (getAuthor) => {
  cy.get('[data-test=chat-drawer]').find('[data-test=message]').last().as('lastMessage');
  const elem = getAuthor
    ? cy.get('@lastMessage').find('header')
    : cy.get('@lastMessage').find('blockquote');
  return elem.invoke('text');
});
