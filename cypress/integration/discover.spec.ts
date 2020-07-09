/// <reference types="cypress" />

describe('Discover', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=btn-discover]').click();
    cy.get('[data-test=discover-drawer]').as('discoverDrawer');
  });

  it('can open and close discover drawer', () => {
    cy.get('@discoverDrawer').should('be.visible');
    cy.get('[data-test=btn-capture-footer]').click();
    cy.get('@discoverDrawer').should('not.be.visible');
  });

  it('loads default set of items', () => {
    cy.get('@discoverDrawer').find('[data-test=discover-item]').should('have.length', 8);
  });

  it('infinite scroll loads more results', () => {
    cy.get('@discoverDrawer').find('[data-test=drawer-content]').as('drawerContent');
    cy.get('@drawerContent').scrollTo('bottom');
    cy.get('@discoverDrawer').find('[data-test=discover-item]').should('have.length', 16);
    cy.get('@drawerContent').scrollTo('bottom');
    cy.get('@discoverDrawer').find('[data-test=discover-item]').should('have.length', 24);
  });
});
