// cypress/e2e/schedule.cy.js

describe('Schedule Page', () => {
  beforeEach(() => {
    cy.visit('/urnik')
  })

  it('should load the schedule page with correct elements', () => {
    // Check main heading
    cy.contains('h1', 'Urnik dogodka').should('be.visible')
    
    // Check schedule days exist
    cy.get('article').should('have.length.at.least', 1)
    
    // Check each day has date, name, and time slots
    cy.get('article').each(($article) => {
      cy.wrap($article).within(() => {
        cy.get('h2').should('exist')
        cy.get('.text-xs').should('exist')
        cy.get('.space-y-3 > div').should('have.length.at.least', 1)
      })
    })
  })

  it('should have schedule data displayed correctly', () => {
    // Check first day's structure
    cy.get('article').first().within(() => {
      // Day should have a name
      cy.get('h2').should('not.be.empty')
      
      // Day should have a date range
      cy.get('.text-xs').contains(/\d{2}:\d{2}/).should('exist')
      
      // Should have time slots
      cy.get('.space-y-3 > div').should('have.length.at.least', 1)
      
      // Each time slot should have time and title
      cy.get('.space-y-3 > div').first().within(() => {
        cy.get('p').first().should('not.be.empty') // Time
        cy.get('p').eq(1).should('not.be.empty') // Title
      })
    })
  })

  it('should have the disclaimer text', () => {
    // Check disclaimer exists
    cy.contains('Urnik se lahko spremeni glede na število prijavljenih ekip.')
      .should('be.visible')
  })

  it('should have proper styling', () => {
    // Check cards have rounded corners
    cy.get('article').first()
      .should('have.css', 'border-radius')
      .and('match', /16px|1rem/)
    
    // Check cards have border
    cy.get('article').first()
      .should('have.css', 'border')
    
    // Check header exists (navigation)
    cy.get('header').should('exist')
  })
})

// Even simpler version:
describe('Schedule Page - Quick Test', () => {
  it('loads schedule page', () => {
    cy.visit('/urnik')
    
    // Quick checks
    cy.contains('Urnik dogodka').should('be.visible')
    cy.get('article').should('exist')
    cy.contains('Urnik se lahko spremeni').should('exist')
  })
})