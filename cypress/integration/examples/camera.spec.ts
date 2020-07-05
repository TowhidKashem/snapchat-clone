/// <reference types="cypress" />

context('Photo Capture', () => {
  beforeEach(() => {
    cy.visit('https://localhost:3000/');
    cy.get('.controls .btn-capture').click();
  });

  it('can take photo', () => {
    cy.get('.photo-capture').should('be.visible');
  });

  it('can close out of photo', () => {
    cy.get('.photo-capture header .btn').click();
    cy.get('.photo-capture').should('not.be.visible');
  });

  it('photo gets added to archive drawer', () => {
    cy.get('.photo-capture header .btn').click();
    cy.get('.archive-btn').click();
    cy.get('#archive.drawer .month:first img:first')
      .invoke('attr', 'src')
      .should('contain', 'data:image/png;base64,');
  });
});
