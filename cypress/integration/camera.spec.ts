/// <reference types="cypress" />

context('Photo Capture', () => {
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
