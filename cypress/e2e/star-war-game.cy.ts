describe('Star war game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  it('should draw a player from resource people and check if it exists in the card', () => {
    cy.get('[data-cy=resource-toogle-button]').first().click();
    cy.get('[data-cy=draw-players-button]').click();

    cy.get('[data-cy=player-card]').should('contain', 'Mass');
  });

  it('should draw a player from resource people and check if it exists in the card', () => {
    cy.get('[data-cy=resource-toogle-button]').last().click();
    cy.get('[data-cy=draw-players-button]').click();

    cy.get('[data-cy=player-card]').should('contain', 'Crew');
  });

  it('should play a game and pick a winner', () => {
    cy.get('[data-cy=draw-players-button]').click();

    cy.get('[data-cy=player-card]').should('contain', 'Mass');

    cy.get('[data-cy=play-button]').click();

    cy.get('[data-cy=winner-label]').should('exist');
  });

  it('should reset card content after change resource', () => {
    cy.get('[data-cy=draw-players-button]').click();

    cy.get('[data-cy=player-card]').should('contain', 'Mass');

    cy.get('[data-cy=resource-toogle-button]').last().click();

    cy.get('[data-cy=player-card]').should('not.contain', 'Mass');
  });
});
