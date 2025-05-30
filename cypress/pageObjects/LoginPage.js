export class LoginPage {
  static login(email, password) {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();
  }
}
