import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// optional: add mount helper
Cypress.Commands.add('mount', mount)
