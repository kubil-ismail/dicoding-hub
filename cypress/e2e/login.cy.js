/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');

    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email address"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('div')
      .contains(/^Password must be at least 6 characters long$/)
      .should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('div')
      .contains(/^Password must be at least 6 characters long$/)
      .should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email address"]').type('wronguser@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('div')
      .contains(/^email or password is wrong$/)
      .should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    // Assuming you have a valid user for testing login
    const validEmail = 'test1235@gmail.com';
    const validPassword = '123456';

    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email address"]').type(validEmail);
    cy.get('input[placeholder="Password"]').type(validPassword);
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Assuming your application redirects to the homepage on successful login
    cy.url().should('include', '/dashboard');
  });
});
