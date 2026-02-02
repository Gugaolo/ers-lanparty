describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders hero section with main title, subtitle, and CTA buttons', () => {
    cy.contains('LAN Party').should('be.visible');
    cy.contains('ERŠ ŠCV').should('be.visible');

    const ctas = [
      { text: 'Prijavi ekipo', href: '/prijava' },
      { text: 'Preberi pravila', href: '#pravila' }
    ];

    ctas.forEach(cta => {
      cy.contains(cta.text)
        .should('be.visible')
        .and('have.attr', 'href', cta.href);
    });
  });

  it('shows event info badges', () => {
    const badges = [
      'Lokacija: Gaudeamus',
      'Datum: 20. - 21. Marec',
      'Vstop: brezplačno'
    ];

    badges.forEach(text => {
      cy.contains(text).should('be.visible');
    });
  });

  it('renders hero image', () => {
    cy.get('img[alt="LAN party illustration"]')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('renders feature cards', () => {
    ['Ekipe in solo', 'Več iger', 'Hitro omrežje'].forEach(card => {
      cy.contains(card).should('be.visible');
    });
  });

  it('renders game list', () => {
    ['CS2', 'Fortnite', 'Rocket League', 'Clash Royale', 'Fifa'].forEach(game => {
      cy.contains(game).should('be.visible');
    });
  });

  it('renders schedule teaser with preview slots', () => {
    cy.contains('Predogled urnika').should('be.visible');

    cy.get('#urnik h3').should('have.length.greaterThan', 0);

    cy.get('#urnik')
      .contains(/\d{2}:\d{2}/)
      .should('be.visible');

    cy.get('#urnik').contains('+').should('exist');
  });

  it('navigates to full schedule page', () => {
    cy.contains('Celoten urnik').click();
    cy.url().should('include', '/urnik');
    cy.contains('Urnik').should('be.visible');
  });

  it('renders rules teaser and navigates to rules page', () => {
    cy.contains('Pravila & oprema').should('be.visible');

    cy.contains('Poglej celotna pravila')
      .should('have.attr', 'href', '/pravila');
  });
});