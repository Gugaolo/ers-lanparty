// cypress/e2e/login.cy.ts
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.viewport(1280, 720);
  });

  // Helper functions
  const fillLoginForm = (email: string, password: string) => {
    cy.get('input[type="email"]').clear().type(email);
    cy.get('input[type="password"]').clear().type(password);
  };

  const submitLoginForm = () => {
    cy.get('form').submit();
  };

  it('naloži stran za prijavo uspešno', () => {
    cy.url().should('include', '/login');
    cy.contains('Prijava v račun').should('be.visible');
    cy.contains('Prijavi se z Google računom ali z e-mailom in geslom.').should('be.visible');
  });

  it('ima celoten obrazec za prijavo z vsemi polji', () => {
    cy.get('form').should('exist');
    cy.get('form').within(() => {
      cy.get('label').contains('E-mail').should('exist');
      cy.get('label').contains('Geslo').should('exist');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  });

  it('validira zahtevana polja ob oddaji obrazca', () => {
    // Clear any pre-filled values
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').clear();
    
    submitLoginForm();
    
    // Check for field-specific error messages in Slovene
    cy.contains('E-mail je obvezen').should('be.visible');
    cy.contains('Geslo je obvezno').should('be.visible');
    
    // Also check for red borders on invalid fields
    cy.get('input[type="email"]').should('have.class', 'ring-red-500');
    cy.get('input[type="password"]').should('have.class', 'ring-red-500');
  });

  it('validira format e-pošte', () => {
    cy.get('input[type="password"]').type('geslo123');
    
    // Invalid email format
    cy.get('input[type="email"]').clear().type('neveljaven-email');
    submitLoginForm();
    cy.get('input[type="email"]:invalid').should('exist');
    
    // Clear and enter valid email
    cy.get('input[type="email"]').clear().type('veljaven@primer.si');
    cy.get('input[type="email"]:invalid').should('not.exist');
  });

  it('prikaže slovensko sporočilo za napačen e-mail ali geslo', () => {
    // Mock Supabase invalid credentials response
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 400,
      body: {
        error: 'invalid_grant',
        error_description: 'Invalid login credentials'
      }
    }).as('invalidLogin');
    
    fillLoginForm('test@example.com', 'wrongpassword');
    submitLoginForm();
    
    cy.wait('@invalidLogin');
    
    // Check for Slovene error message
    cy.contains('Napačen e-mail ali geslo. Preverite svoje podatke.').should('be.visible');
    
    // Check for field-specific error messages
    cy.contains('Napačen e-mail ali geslo').should('exist');
    
    // Check red styling for error message
    cy.get('.bg-red-500\\/20.text-red-300').should('exist');
  });

  it('prikaže slovensko sporočilo za neobstoječ uporabnik', () => {
    // Mock Supabase user not found response
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 400,
      body: {
        error: 'invalid_grant',
        error_description: 'User not found'
      }
    }).as('userNotFound');
    
    fillLoginForm('neobstojeci@example.com', 'password123');
    submitLoginForm();
    
    cy.wait('@userNotFound');
    
    // Check for Slovene error message
    cy.contains('Uporabnik s tem e-mailom ne obstaja. Preverite e-mail ali ustvarite nov račun.').should('be.visible');
    
    // Check for email field error
    cy.contains('Uporabnik s tem e-mailom ne obstaja').should('be.visible');
  });

  it('prikaže slovensko sporočilo za nepotrjen e-mail', () => {
    // Mock Supabase email not confirmed response
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 400,
      body: {
        error: 'invalid_grant',
        error_description: 'Email not confirmed'
      }
    }).as('emailNotConfirmed');
    
    fillLoginForm('test@example.com', 'password123');
    submitLoginForm();
    
    cy.wait('@emailNotConfirmed');
    
    cy.contains('E-mail ni potrjen. Preverite svoj e-mail za potrditveno povezavo.').should('be.visible');
  });

  it('prikaže slovensko sporočilo za preveč poskusov', () => {
    // Mock Supabase rate limit response
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 429,
      body: {
        error: 'too_many_requests',
        error_description: 'Too many requests'
      }
    }).as('rateLimit');
    
    fillLoginForm('test@example.com', 'password123');
    submitLoginForm();
    
    cy.wait('@rateLimit');
    
    cy.contains('Preveč poskusov prijave. Počakajte nekaj trenutkov pred ponovnim poskusom.').should('be.visible');
  });

  it('prijava uspešna in preusmeritev', () => {
    // Mock Supabase success response
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 200,
      body: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '12345678-1234-1234-1234-123456789012',
          aud: 'authenticated',
          email: 'test@example.com',
          email_confirmed_at: '2024-01-01T00:00:00.000Z',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z'
        }
      }
    }).as('loginSuccess');
    
    // Mock the session response
    cy.intercept('GET', '**/auth/v1/user*', {
      statusCode: 200,
      body: {
        user: {
          id: '12345678-1234-1234-1234-123456789012',
          email: 'test@example.com'
        }
      }
    }).as('getUser');
    
    fillLoginForm('test@example.com', 'password123');
    submitLoginForm();
    
    cy.wait('@loginSuccess');
    
    // Check for Slovene success message
    cy.contains('Prijava uspešna. Preusmerjam...').should('be.visible');
    
    // Check green styling for success message
    cy.get('.bg-green-500\\/20.text-green-300').should('exist');
    
    // Check if redirect happens
    cy.location('pathname', { timeout: 2000 }).should('eq', '/profile');
  });

  it('prikaže stanje nalaganja ob prijavi', () => {
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      delay: 2000, // 2 second delay to show loading state
      statusCode: 200,
      body: {
        access_token: 'test-token',
        user: { id: '123', email: 'test@example.com' }
      }
    }).as('loginRequest');
    
    fillLoginForm('test@example.com', 'password123');
    cy.get('button[type="submit"]').click();
    
    // Check loading state
    cy.contains('Prijavljam...').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.wait('@loginRequest');
    
    // Loading state should disappear
    cy.contains('Prijavljam...').should('not.exist');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('ima povezavo na stran za registracijo', () => {
    cy.contains('Nimaš profila?').should('be.visible');
    cy.contains('Ustvari profil').should('have.attr', 'href', '/signup');
  });

  it('gumb za Google prijavo je prisoten', () => {
    cy.contains('Prijava z Google računom').should('exist');
    cy.get('button').contains('Prijava z Google računom').should('be.visible');
  });

  it('ima povezavo za pozabljeno geslo', () => {
    cy.contains('Pozabljeno geslo?').should('be.visible');
    cy.contains('Pozabljeno geslo?').should('have.attr', 'href', '/forgot-password');
  });

  it('ima povezavo nazaj na domačo stran', () => {
    cy.contains('Domov').should('be.visible');
    cy.contains('Domov').should('have.attr', 'href', '/');
  });

  it('izbriše napake ob ponovnem tipkanju', () => {
    // Trigger error
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').clear();
    submitLoginForm();
    
    cy.contains('E-mail je obvezen').should('be.visible');
    
    // Start typing - error should disappear
    cy.get('input[type="email"]').type('t');
    cy.contains('E-mail je obvezen').should('not.exist');
    
    cy.get('input[type="email"]').should('not.have.class', 'ring-red-500');
  });
});