/// <reference types="cypress" />
import React from 'react'
import { MultiSelect } from '@/app/components/MultiSelect'

const options = [
  { value: 'cs', label: 'CS:GO' },
  { value: 'lol', label: 'League of Legends' },
  { value: 'minecraft', label: 'Minecraft' },
]

describe('MultiSelect Component', () => {
  it('renders placeholder and button', () => {
    cy.mount(<MultiSelect name="games" options={options} />)
    cy.contains('Izberi možnost').should('be.visible')
    cy.get('button').first().should('exist')
  })

  it('opens dropdown on click', () => {
    cy.mount(<MultiSelect name="games" options={options} />)
    cy.get('button').first().click()
    cy.contains('CS:GO').should('be.visible')
    cy.contains('League of Legends').should('be.visible')
    cy.contains('Minecraft').should('be.visible')
  })


  it('clears all selections', () => {
    cy.mount(<MultiSelect name="games" options={options} defaultSelected={['cs','lol']} />)
    cy.get('button').first().click()
    cy.contains('Počisti').click()
    cy.get('input[name="games"]').should('have.length', 0)
    cy.get('button').first().contains('0')
  })

  it('filters options using search', () => {
    cy.mount(<MultiSelect name="games" options={options} />)
    cy.get('button').first().click()
    cy.get('input[placeholder="Išči..."]').type('mine')
    cy.contains('Minecraft').should('be.visible')
    cy.contains('CS:GO').should('not.exist')
    cy.contains('League of Legends').should('not.exist')
  })
})
