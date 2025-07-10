describe('기본 Cypress E2E', () => {
  it('메인 페이지 접속', () => {
    cy.visit('/');
    cy.title().should('exist');
  });
}); 