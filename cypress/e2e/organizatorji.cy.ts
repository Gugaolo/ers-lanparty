// cypress/e2e/organizers.cy.js

describe('Organizers Page', () => {
  beforeEach(() => {
    cy.visit('/organizatorji')
  })

  it('should load the organizers page with correct title', () => {
    // Check main heading
    cy.contains('h1', 'Organizatorji LAN Party ERŠ').should('be.visible')
    
    // Check subtitle
    cy.contains('Ekipa dijakov in mentorjev, ki stoji za dogodkom.')
      .should('be.visible')
  })

  it('should display all 5 organizers', () => {
    // Check there are 5 organizer cards
    cy.get('.grid > div').should('have.length', 5)
    
    // Check specific organizers exist
    cy.contains('p', 'Gal Štravs').should('be.visible')
    cy.contains('p', 'Tim Rednjak').should('be.visible')
    cy.contains('p', 'Andraž Dimec').should('be.visible')
    cy.contains('p', 'Tilen Zavolovšek').should('be.visible')
    cy.contains('p', 'Jon Zorko Kotnik').should('be.visible')
  })

  it('should show organizer roles and classes', () => {
    // Check first organizer has correct details
    cy.get('.grid > div').first().within(() => {
      cy.contains('.text-xs', 'Organizator1').should('exist')
      cy.contains('.text-sm', 'Gal Štravs').should('exist')
      cy.contains('.text-xs', '4. TRA').should('exist')
    })
    
    // Check all organizers have the same class
    cy.get('.grid > div').each(($card) => {
      cy.wrap($card).contains('4. TRA').should('exist')
    })
  })

  it('should have responsive grid layout', () => {
    // On larger screens should have 2 columns
    cy.viewport(1280, 720)
    cy.get('.grid').should('have.css', 'grid-template-columns')
    
    // Check grid has gap
    cy.get('.grid').should('have.css', 'gap')
  })
})

// Quick version for basic testing:
describe('Organizers Page - Quick Test', () => {
  it('loads and displays organizers', () => {
    cy.visit('/organizatorji')
    
    // Basic checks
    cy.contains('Organizatorji LAN Party ERŠ').should('exist')
    cy.contains('Gal Štravs').should('exist')
    cy.contains('Tim Rednjak').should('exist')
    cy.contains('4. TRA').should('exist')
    cy.get('.grid > div').should('have.length', 5)
  })
})