/// <reference types="cypress" />

describe('Chat', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=btn-chat]').click();
    cy.get('[data-test=chat-drawer]').as('chatDrawer');
    cy.get('@chatDrawer').find('[data-test=input-field]').as('chatField');
    cy.wait(1000); // Default message is received after 1 second
  });

  it('recieves default message on opening drawer', () => {
    cy.fixture('message').then(({ author, message }) => {
      cy.getLastMessage(true).should('equal', author);
      cy.getLastMessage().should('equal', message);
    });
  });

  it("can't send empty message", () => {
    cy.get('@chatField').type('{enter}');
    cy.getLastMessage().should('not.have.length', 0);
  });

  it('can send message', () => {
    const msg = 'abc';
    cy.get('@chatField').type(msg).type('{enter}');
    cy.getLastMessage().should('equal', msg);
  });

  it('receives a message for every message sent', () => {
    const msg = 'abc';
    cy.get('@chatField').type(msg).type('{enter}');
    cy.wait(5000);
    cy.getLastMessage(true).should('equal', 'Lisa');
    cy.get('@chatField').type(msg).type('{enter}');
    cy.get('@chatField').type(msg).type('{enter}');
    cy.wait(5000);
    cy.getLastMessage(true).should('equal', 'Lisa');
    cy.wait(5000);
    cy.get('@chatDrawer').find('[data-test=message]').last().prev().as('lastMessage');
    cy.get('@lastMessage').find('header').invoke('text').should('equal', 'Lisa');
  });
});
