/// <reference types="cypress" />

describe('Snap Map', () => {
  beforeEach(() => {
    cy.loadApp();
    cy.get('[data-test=header] [data-test=avatar-btn]').click();
    cy.get('[data-test=account-drawer]').as('accountDrawer');
    cy.get('@accountDrawer').find('[data-test=preview-map]').as('previewMap');
    cy.wait(2500);
    cy.get('@previewMap').click();
    cy.get('[data-test=snapMap-drawer]').as('snapMapDrawer');
  });

  it('can open snap map', () => {
    cy.get('@snapMapDrawer').should('be.visible');
  });

  it('can open snap', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').first().click();
    cy.get('[data-test=snap-drawer]').as('snapDrawer');
    cy.get('@snapDrawer').should('be.visible');
  });

  it('can close out of snap', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').first().click();
    cy.get('[data-test=snap-drawer]').as('snapDrawer');
    cy.get('@snapDrawer').find('[data-test=snap]').click();
    cy.get('@snapDrawer').should('not.be.visible');
  });

  it('snap location and time appears in header', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').first().click();
    cy.get('[data-test=snap-drawer]').as('snapDrawer');
    cy.get('@snapDrawer')
      .find('[data-test=location]')
      .invoke('text')
      .should('not.have.length', 0);
    cy.get('@snapDrawer')
      .find('[data-test=time]')
      .invoke('text')
      .should('not.have.length', 0);
  });

  it('video snap', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').first().click();
    cy.get('[data-test=snap-drawer]').as('snapDrawer');
    cy.get('@snapDrawer').find('[data-test=video]').should('be.visible');
  });

  it('drawer automatically closes after video finishes playing', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').first().click();
    cy.wait(7000);
    cy.get('@snapMapDrawer').should('not.be.visible');
  });

  it('image snap', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').eq(1).click();
    cy.get('[data-test=snap-drawer]').as('snapDrawer');
    cy.get('@snapDrawer').find('[data-test=image]').should('be.visible');
  });

  it('displays image caption', () => {
    cy.get('@snapMapDrawer').find('[data-test=marker]').eq(1).click();
    cy.get('[data-test=snap-drawer]').as('snapDrawer');
    cy.get('@snapDrawer').find('[data-test=caption]').should('be.visible');
    cy.get('@snapDrawer')
      .find('[data-test=caption]')
      .invoke('text')
      .should('not.have.length', 0);
  });
});
