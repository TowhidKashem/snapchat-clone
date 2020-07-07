/// <reference types="cypress" />

describe('Archive', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.loadApp();
      cy.get('[data-test=archive-btn]').click();
      cy.get('[data-test=archive-drawer]').as('archiveDrawer');
    });

    it('can open and close archive drawer', () => {
      cy.get('@archiveDrawer').should('be.visible');
      cy.get('[data-test=btn-capture-footer]').click();
      cy.get('@archiveDrawer').should('not.be.visible');
    });

    it('loads default set of items', () => {
      cy.get('@archiveDrawer').find('[data-test=month]').should('have.length', 3);
      cy.get('@archiveDrawer').find('[data-test=snap-image]').should('have.length', 6);
    });

    it('clicking snap opens popup', () => {
      cy.get('@archiveDrawer')
        .find('[data-test=snap-image]')
        .first()
        .invoke('attr', 'src')
        .then((src) => {
          cy.get('@archiveDrawer').find('[data-test=snap-image]').first().click();
          cy.get('[data-test=snap-drawer]').as('snapDrawer');
          cy.get('@snapDrawer').should('be.visible');
          cy.get('[data-test=image]')
            .find('img')
            .invoke('attr', 'src')
            .should('equal', src);
        });
    });
  });

  describe('new photos', () => {
    beforeEach(() => {
      cy.loadApp();
      cy.get('[data-test=btn-capture-main]').as('captureBtn');
      cy.get('@captureBtn').click();
      cy.get('[data-test=photo-capture]').as('photoCapture');
      cy.get('@photoCapture').find('[data-test=close-btn]').click();
      cy.get('[data-test=archive-btn]').click();
    });

    it('photo gets added to archive drawer', () => {
      cy.get('[data-test=archive-drawer]')
        .find('[data-test=month]:first [data-test=snap-image]:first')
        .invoke('attr', 'src')
        .should('contain', 'data:image/png;base64,');
    });

    it('"photo will appear here" placeholder message goes away after taking photo', () => {
      cy.get('[data-test=archive-drawer]')
        .find('[data-test=placeholder-msg]')
        .should('not.exist');
    });
  });
});
