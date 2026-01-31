// cypress/e2e/contact.cy.js

describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/kontakt')
  })

  it('should load the contact page with correct title', () => {
    // Check main heading
    cy.contains('h1', 'Kontakt organizatorjev').should('be.visible')
    
    // Check subtitle
    cy.contains('Imaš vprašanje glede prijave, iger ali pravil?')
      .should('be.visible')
  })

  it('should display main contact information', () => {
    // Check main contact section exists
    cy.contains('h2', 'Glavni kontakt').should('be.visible')
    
    // Check email addresses exist
    cy.contains('E-mail 1:').should('be.visible')
    cy.contains('tim.rednjak@scv.si').should('be.visible')
    
    cy.contains('E-mail 2 (mentor):').should('be.visible')
    cy.contains('samo.zeleznik@scv.si').should('be.visible')
  })

  it('should have Discord section with link', () => {
    // Check Discord section exists
    cy.contains('h2', 'Discord strežnik').should('be.visible')
    
    // Check Discord description exists
    cy.contains('Za hitra vprašanja, dogovor s soigralci')
      .should('be.visible')
    
    // Check Discord button exists with correct link
    cy.contains('a', 'Pridruži se Discordu')
      .should('have.attr', 'href', 'https://discord.gg/Tr3TFd3XZe')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })

  it('should display other information section', () => {
    cy.contains('h2', 'Ostale informacije').should('be.visible')
  })


  it('should open Discord link in new tab', () => {
    // Verify link opens in new tab
    cy.contains('a', 'Pridruži se Discordu')
      .should('have.attr', 'target', '_blank')
  })
})

// Quick version for basic testing:
describe('Contact Page - Quick Test', () => {
  it('loads and displays contact information', () => {
    cy.visit('/kontakt')
    
    // Basic checks
    cy.contains('Kontakt organizatorjev').should('exist')
    cy.contains('tim.rednjak@scv.si').should('exist')
    cy.contains('Pridruži se Discordu').should('exist')
    cy.contains('Ostale informacije').should('exist')
  })
})