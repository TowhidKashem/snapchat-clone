/// <reference types="cypress" />

describe('Discover', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=discover-btn]').click();
    cy.get('[data-test=discover-drawer]').as('discoverDrawer');
  });

  it('loads default set of items', () => {
    cy.get('@discoverDrawer').find('[data-test=discover-item]').should('have.length', 8);
  });

  it('infinite scroll works', () => {
    cy.get('@discoverDrawer').find('[data-test=drawer-content]').as('drawerContent');
    cy.get('@drawerContent').scrollTo('bottom');
    cy.get('@discoverDrawer').find('[data-test=discover-item]').should('have.length', 16);
    cy.get('@drawerContent').scrollTo('bottom');
    cy.get('@discoverDrawer').find('[data-test=discover-item]').should('have.length', 24);
  });
});
