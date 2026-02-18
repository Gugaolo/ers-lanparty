// cypress/e2e/teams.cy.ts
describe('Teams Page - Simple Tests', () => {
  beforeEach(() => {
    cy.visit('/teams');
  });

  it('should load the teams page', () => {
    cy.url().should('include', '/teams');
  });

  it('should have main title and description', () => {
    cy.contains('LAN Party').should('be.visible');
    cy.contains(/Seznam prijavljenih ekip in [cc]lanov\./i).should('be.visible');
  });

  it('should have a table', () => {
    cy.get('table').should('exist');
  });

  it('should have table headers', () => {
    cy.get('table thead').within(() => {
      cy.contains('#').should('exist');
      cy.contains('Ime ekipe').should('exist');
      cy.contains(/^[CC]lani$/).should('exist');
      cy.contains('Igre').should('exist');
      cy.contains('Ustvarjeno').should('exist');
      cy.contains('Uredi').should('exist');
    });
  });

  it('should have home link', () => {
    cy.contains('Domov').should('exist');
    cy.contains('Domov').should('have.attr', 'href', '/');
  });

  it('should display teams if they exist', () => {
    // This will pass if there are teams, fail if not
    cy.get('tbody tr').then(($rows) => {
      if ($rows.length > 0) {
        cy.log('Teams exist in the table');
        expect($rows.length).to.be.greaterThan(0);
      } else {
        cy.contains(/ni vne[sš]enih ekip/i).should('exist');
      }
    });
  });

  it('should have edit links or placeholders', () => {
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td').last().should('exist');
      });
    });
  });
});
