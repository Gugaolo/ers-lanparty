// cypress/support/component.ts

import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
  interface Window {
    next: {
      navigation: Record<string, unknown>
      headers: Record<string, unknown>
    }
  }
}

Cypress.Commands.add('mount', mount)

// Stub next/navigation and next/headers at the window level
// to prevent webpack from trying to load server-only modules
if (typeof window !== 'undefined') {
  window.next = {
    navigation: {},
    headers: {},
  } as any
}