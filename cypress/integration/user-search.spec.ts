/// <reference types="cypress" />

describe('User Drawer', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=header] [data-test=input]').click();
    cy.get('[data-test=search-drawer]').as('searchDrawer');
    cy.get('@searchDrawer').find('[data-test=field]').as('searchField');
    cy.get('@searchDrawer').find('[data-test=cancel-btn]').as('cancelButton');
  });

  it('can open user drawer', () => {
    cy.get('@searchDrawer').should('be.visible');
  });

  it('can filter search results', () => {
    cy.get('@searchField').focus().type('ed');
    cy.get('@searchDrawer').find('.results .pod.user').should('have.length', 7);
    cy.wait(100);
    cy.get('@searchField').type('d');
    cy.get('@searchDrawer').find('.results .pod.user').should('have.length', 1);
  });

  it('can see no results message', () => {
    cy.get('@searchField').focus().type('xyz');
    cy.get('@searchDrawer').find('.results .pod.user').should('have.length', 0);
    cy.get('@searchDrawer').find('.no-results').should('be.visible');
  });
});
