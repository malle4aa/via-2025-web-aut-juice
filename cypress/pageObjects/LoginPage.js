import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  static get emailField() {
    return cy.get("#email");
  }

  static get passwordField() {
    return cy.get("#password");
  }

  static get loginSubmitButton() {
    return cy.get("#loginButton");
  }

  static get notYetCustomerLink() {
    return cy.get("a[routerlink='/register']");
  }

  static get loginNavButton() {
    return cy.get("#navbarLoginButton");
  }

  static get accountButton() {
    return cy.get("#navbarAccount");
  }
}
