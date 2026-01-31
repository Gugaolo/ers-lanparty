// cypress/e2e/signup.cy.ts
describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
    cy.viewport(1280, 720);
  });

  // Helper functions
  const fillSignupForm = (email: string, password: string) => {
    cy.get('input[type="email"]').clear().type(email);
    cy.get('input[type="password"]').clear().type(password);
  };

  const submitSignupForm = () => {
    cy.get('form').submit();
  };

  it('naloži stran za registracijo uspešno', () => {
    cy.url().should('include', '/signup');
    cy.contains('Ustvari profil').should('be.visible');
    cy.contains('Vnesi e-mail in geslo za nov račun. Po ustvaritvi se prijavi na strani za prijavo.').should('be.visible');
  });

  it('ima delujočo navigacijo nazaj na domačo stran', () => {
    cy.contains('Domov').should('be.visible');
    cy.contains('Domov').should('have.attr', 'href', '/');
  });

  it('ima celoten obrazec za registracijo z vsemi zahtevanimi polji', () => {
    cy.get('form').should('exist');
    cy.get('form').within(() => {
      cy.get('label').contains('E-mail').should('exist');
      cy.get('label').contains('Geslo').should('exist');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  });

  it('validira zahtevana polja ob oddaji praznega obrazca', () => {
    // Clear any pre-filled values
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').clear();
    
    submitSignupForm();
    
    // Check HTML5 validation
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('validira format e-pošte s slovenskim sporočilom', () => {
    // Fill password to avoid empty field validation
    cy.get('input[type="password"]').type('geslo123');
    
    // Test invalid email format
    cy.get('input[type="email"]').clear().type('neveljaven-email');
    submitSignupForm();
    
    // Check for custom Slovene error message
    cy.contains('Napaka: Neveljaven e-poštni naslov').should('be.visible');
    
    // Clear and test valid email
    cy.get('input[type="email"]').clear().type('veljaven@primer.si');
    submitSignupForm();
    
    // Should not show the custom error message
    cy.contains('Napaka: Neveljaven e-poštni naslov').should('not.exist');
  });

  it('prikaže uspešno sporočilo po uspešni registraciji', () => {
    // Mock successful signup response
    cy.intercept('POST', '**/auth/v1/signup', {
      statusCode: 200,
      body: {
        user: {
          id: '12345678-1234-1234-1234-123456789012',
          email: 'test@example.com',
          aud: 'authenticated',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z'
        },
        session: null
      }
    }).as('signUpSuccess');

    fillSignupForm('test@example.com', 'password123');
    submitSignupForm();

    cy.wait('@signUpSuccess');
    
    // Check for Slovene success message
    cy.contains('Profil ustvarjen. Preveri e-mail (če je zahtevana potrditev) in nato se prijavi.').should('be.visible');
  });

  it('prikaže sporočilo, če račun že obstaja', () => {
    // Mock Supabase response for existing user
    cy.intercept('POST', '**/auth/v1/signup', {
      statusCode: 200,
      body: {
        user: {
          id: '12345678-1234-1234-1234-123456789012',
          email: 'test@example.com',
          identities: [] // Empty identities array indicates user exists
        },
        session: null
      }
    }).as('existingUser');

    fillSignupForm('test@example.com', 'password123');
    submitSignupForm();

    cy.wait('@existingUser');
    
    // Check for Slovene "user already exists" message
    cy.contains('Račun s tem e-mailom že obstaja. Prijavi se ali uporabi drug e-mail.').should('be.visible');
  });

  it('ima povezavo na stran za prijavo', () => {
    cy.contains('Že imaš račun?').should('be.visible');
    cy.contains('Pojdi na prijavo').should('have.attr', 'href', '/login');
  });

  it('prikaže stanje nalaganja ob registraciji', () => {
    cy.intercept('POST', '**/auth/v1/signup', {
      delay: 2000, // 2 second delay
      statusCode: 200,
      body: {
        user: { id: '123', email: 'test@example.com' },
        session: null
      }
    }).as('signUpRequest');

    fillSignupForm('test@example.com', 'password123');
    cy.get('button[type="submit"]').click();
    
    // Check loading state
    cy.contains('Ustvarjam...').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.wait('@signUpRequest');
    
    // Loading state should disappear
    cy.contains('Ustvarjam...').should('not.exist');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('gumb za Google prijavo je prisoten', () => {
    cy.contains('Prijava z Google računom').should('be.visible');
    });
  

  it('preverja HTML5 validacijo e-mail polja', () => {
    cy.get('input[type="email"]').should('have.attr', 'required');
    cy.get('input[type="email"]').should('have.attr', 'type', 'email');
  });

  it('preverja HTML5 validacijo gesla polja', () => {
    cy.get('input[type="password"]').should('have.attr', 'required');
    cy.get('input[type="password"]').should('have.attr', 'type', 'password');
  });

  it('preverja placeholder vrednosti', () => {
    cy.get('input[type="email"]').should('have.attr', 'placeholder', 'ime@primer.si');
    cy.get('input[type="password"]').should('have.attr', 'placeholder', '********');
  });


  it('ima pravilne stile za obvestila', () => {
    // Trigger an error to see the message styling
    cy.intercept('POST', '**/auth/v1/signup', {
      statusCode: 400,
      body: { error: { message: 'Test error', status: 400 } }
    }).as('testError');
    
    fillSignupForm('test@example.com', 'password123');
    submitSignupForm();
    
    cy.wait('@testError');
    
    // Check that message has proper styling
    cy.get('.bg-white\\/5.text-white\\/90').should('be.visible');
  });

  it('obnovi polja po neuspešni oddaji', () => {
    cy.intercept('POST', '**/auth/v1/signup', {
      statusCode: 400,
      body: { error: { message: 'Test error', status: 400 } }
    }).as('failedSignup');
    
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    fillSignupForm(testEmail, testPassword);
    submitSignupForm();
    
    cy.wait('@failedSignup');
    
    // Values should remain in the form after failed submission
    cy.get('input[type="email"]').should('have.value', testEmail);
    cy.get('input[type="password"]').should('have.value', testPassword);
  });
});