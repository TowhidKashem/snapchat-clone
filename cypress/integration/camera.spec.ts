/// <reference types="cypress" />

describe('Camera', () => {
  describe('Filters', () => {
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

  describe('Photo Capture', () => {
    beforeEach(() => {
      cy.loadApp();
      cy.get('[data-test=btn-capture]').as('captureBtn');
      cy.get('@captureBtn').click();
      cy.get('[data-test=photo-capture]').as('photoCapture');
    });

    it('can take photo', () => {
      cy.get('@photoCapture').should('be.visible');
    });

    it('can close out of photo', () => {
      cy.get('@photoCapture').find('[data-test=close-btn]').click();
      cy.get('@photoCapture').should('not.be.visible');
    });
  });
});
