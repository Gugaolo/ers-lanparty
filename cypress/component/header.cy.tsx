/// <reference types="cypress" />

import React from 'react'
import Header from '@/app/components/header'

const MockNavUser = () => (
  <div data-testid="nav-user">User Menu</div>
)

describe('Header Component', () => {
  it('renders NavUser', () => {
    cy.mount(<Header NavUserComponent={MockNavUser} />)

    cy.get('[data-testid="nav-user"]').should('exist')
    cy.contains('User Menu').should('be.visible')
  })
})
