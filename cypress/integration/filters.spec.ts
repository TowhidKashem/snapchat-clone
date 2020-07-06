/// <reference types="cypress" />

context('Filters', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=btn-filters]').as('filtersBtn');
    cy.get('[data-test=filter-canvas]').as('filterCanvas');
    cy.get('@filtersBtn').click();
  });

  it('can see filter buttons', () => {
    cy.get('[data-test=filters]').should('be.visible');
  });

  it('filter is set', () => {
    cy.wait(500);
    // Jeelizfacefilter sets the width and height attributes on the canvas
    // if a filter is successfully set so thats one way to tell if the filter worked
    cy.get('@filterCanvas').and('have.attr', 'width');
    cy.get('@filterCanvas').and('have.attr', 'height');
  });
});
