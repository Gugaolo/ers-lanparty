/// <reference types="cypress" />

import React from 'react'
import Footer from '@/app/components/footer'

// Mock Next.js Link
const MockLink = ({ href, children, className, ...props }: any) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
)

describe('Footer Component', () => {
  beforeEach(() => {
    cy.stub(require('next/link'), 'default').callsFake(MockLink)
    cy.mount(<Footer />)
  })

  it('renders copyright', () => {
    cy.contains(`© ${new Date().getFullYear()} ERŠ ŠCV LAN Party`).should('be.visible')
  })

  it('renders footer links', () => {
    cy.contains('a', 'Kontakt').should('have.attr', 'href', '/kontakt').and('be.visible')
    cy.contains('a', 'Organizatorji').should('have.attr', 'href', '/organizatorji').and('be.visible')
  })

  it('has correct layout classes', () => {
    cy.get('footer').should('have.class', 'border-t')
    cy.get('footer').should('have.class', 'border-white/10')
    cy.get('footer').should('have.class', 'bg-black/30')

    cy.get('div.mx-auto').should('have.class', 'flex')
      .and('have.class', 'max-w-6xl')
      .and('have.class', 'flex-col')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-between')
      .and('have.class', 'gap-3')
      .and('have.class', 'px-6')
      .and('have.class', 'py-6')
      .and('have.class', 'sm:flex-row')
  })
})
