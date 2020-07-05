/// <reference types="cypress" />

context('User Search', () => {
  beforeEach(() => {
    cy.visit('https://localhost:3000/');
    // cy.viewport(414, 750);
  });

  it('can search', () => {
    cy.get('.input').click();
    cy.get('#search.drawer .view').should('be.visible');
    cy.get('#search.drawer input[type="text"]').type('ed');
    cy.get('#search.drawer .results .pod.user').should('have.length', 7);
    cy.wait(250);
    cy.get('#search.drawer input[type="text"]').type('d');
    cy.get('#search.drawer .results .pod.user').should('have.length', 1);
  });

  it('can exit drawer', () => {
    cy.get('.input').click();
    cy.get('#search.drawer header .btn.plain').click();
    cy.get('#search.drawer .view').should('not.be.visible');
  });
});
