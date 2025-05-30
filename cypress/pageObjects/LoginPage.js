import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  static get url() {
    return "/#/login";
  }

  static get emailField() {
    return cy.get("#email");
  }

  static get passwordField() {
    return cy.get("#password");
  }

  static get loginButton() {
    return cy.get("#loginButton");
  }

  static get newCustomerLink() {
    return cy.contains("Not yet a customer?");
  }
}
