/// <reference types="cypress" />

context('Filters', () => {
  beforeEach(() => {
    cy.visit('https://localhost:3000/');
    // cy.viewport(414, 750);
  });

  it('can see filter buttons', () => {
    cy.get('.controls .btn-filters').click();
    cy.get('.filters').should('be.visible');
  });

  it('filter is set', () => {
    cy.get('.controls .btn-filters').click();
    cy.wait(500);
    cy.get('#filter-canvas').should('have.length', 1);
    // Jeelizfacefilter sets the width and height attributes on the canvas
    // if a filter is successfully set so thats one way to tell if the filter worked
    cy.get('#filter-canvas').and('have.attr', 'width');
    cy.get('#filter-canvas').and('have.attr', 'height');
  });
});
