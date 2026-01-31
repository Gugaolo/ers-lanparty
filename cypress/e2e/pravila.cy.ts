// cypress/e2e/rules.cy.js

describe('Rules Page', () => {
  beforeEach(() => {
    cy.visit('/pravila')
  })

  it('should load the rules page with correct title', () => {
    // Check main heading
    cy.contains('h1', 'Pravila LAN Party ERŠ ŠCV').should('be.visible')
    
    // Check subtitle
    cy.contains('Osnovna pravila in smernice za varno in fair-play igranje.')
      .should('be.visible')
  })

  it('should display all rule sections', () => {
    // Check all 6 rule sections exist
    const ruleSections = [
      '1. Splošna pravila',
      '2. Oprema in varnost',
      '3. Igre in potek turnirjev',
      '4. Vedenje in fair play',
      '5. Alkohol, prepovedane substance in red',
      '6. Fotografiranje in mediji'
    ]
    
    ruleSections.forEach(section => {
      cy.contains('h2', section).should('be.visible')
    })
  })

  it('should have bullet points for each rule section', () => {
    // Check each section has list items
    cy.get('h2').each(($h2) => {
      cy.wrap($h2)
        .parent() // Go to parent div
        .find('ul li')
        .should('have.length.at.least', 2) // Each section should have at least 2 rules
    })
  })

  it('should have the disclaimer at the bottom', () => {
    cy.contains('Organizator si pridržuje pravico do spremembe pravil.')
      .should('be.visible')
  })

  it('should have proper styling and layout', () => {

  })
})

// Quick version for basic testing:
describe('Rules Page - Quick Test', () => {
  it('loads and displays rules', () => {
    cy.visit('/pravila')
    
    // Basic checks
    cy.contains('Pravila LAN Party ERŠ ŠCV').should('exist')
    cy.contains('Splošna pravila').should('exist')
    cy.contains('Igre in potek turnirjev').should('exist')
    cy.contains('Organizator si pridržuje pravico do spremembe pravil').should('exist')
  })
})