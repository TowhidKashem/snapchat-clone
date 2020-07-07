/// <reference types="cypress" />

describe('Archive', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=archive-btn]').click();
    cy.get('[data-test=archive-drawer]').as('archiveDrawer');
  });

  it('loads default set of items', () => {
    cy.get('@archiveDrawer').find('[data-test=month]').should('have.length', 3);
    cy.get('@archiveDrawer').find('[data-test=snap-image]').should('have.length', 6);
  });
});
