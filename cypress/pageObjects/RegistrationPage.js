import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  static get emailField() {
    return cy.get("#emailControl");
  }

  static get passwordField() {
    return cy.get("#passwordControl");
  }

  static get repeatPasswordField() {
    return cy.get("#repeatPasswordControl");
  }

  static get securityQuestionDropdown() {
    return cy.get("[name='securityQuestion']");
  }

  static securityQuestionOption(text = "Name of your favorite pet?") {
    return cy.get("mat-option").contains(text);
  }

  static get securityAnswerField() {
    return cy.get("#securityAnswerControl");
  }

  static get registerButton() {
    return cy.get("#registerButton");
  }
}
