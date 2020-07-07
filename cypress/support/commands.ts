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
