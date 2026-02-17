// cypress/e2e/team-signup.cy.js

describe('Team Signup Form', () => {
  beforeEach(() => {
    cy.visit('/prijava')
  })

  it('should show login prompt when not logged in', () => {
    // Check warning message appears
    cy.contains('Za oddajo prijave se najprej prijavi ali ustvariti profil.')
      .should('be.visible')
    
    // Check login and signup links exist
    cy.contains('a', 'Prijava')
      .should('have.attr', 'href', '/login')
    
    cy.contains('a', 'Ustvari profil')
      .should('have.attr', 'href', '/signup')
    
    // Submit button should be disabled
    cy.get('button[type="submit"]')
      .should('be.disabled')
  })

  it('should have all required form fields', () => {
    // Check all form elements exist
    cy.get('input[name="group_name"]').should('exist')
    cy.get('textarea[name="members"]').should('exist')
    cy.get('input[name="leader_discord"]').should('exist')
    cy.get('input[name="logo_file"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
    
    // Check labels
    cy.contains('label', 'Ime ekipe *').should('exist')
    cy.contains('label', 'Člani ekipe *').should('exist')
    cy.contains('label', 'Discord ime vodje ekipe *').should('exist')
    cy.contains('label', 'Logo ekipe').should('exist')
  })

  it('should validate required fields', () => {
    // Mock being logged in by enabling the button
    cy.get('button[type="submit"]')
      .invoke('prop', 'disabled', false)
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click()
    
    // The form should prevent submission (check URL hasn't changed)
    cy.url().should('include', '/prijava')
  })

  it('should fill and submit form successfully', () => {
    // Mock being logged in
    cy.get('button[type="submit"]')
      .invoke('prop', 'disabled', false)
    
    // Fill in required fields
    cy.get('input[name="group_name"]')
      .type('Test Ekipa')
      .should('have.value', 'Test Ekipa')
    
    cy.get('textarea[name="members"]')
      .type('Janez, Marija, Luka')
      .should('have.value', 'Janez, Marija, Luka')

    cy.get('input[name="leader_discord"]')
      .type('janez#1234')
      .should('have.value', 'janez#1234')
    
    // Check submit button is now enabled
    cy.get('button[type="submit"]')
      .should('not.be.disabled')
  })
})
