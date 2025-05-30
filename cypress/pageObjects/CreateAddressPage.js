import { BasePage } from "./BasePage";

export class CreateAddressPage extends BasePage {
  static get country() {
    return cy.get("#mat-input-1");
  }

  static get name() {
    return cy.get("#mat-input-2");
  }

  static get mobileNumber() {
    return cy.get("#mat-input-3");
  }

  static get zipCode() {
    return cy.get("#mat-input-4");
  }

  static get address() {
    return cy.get("#mat-input-5");
  }

  static get city() {
    return cy.get("#mat-input-6");
  }

  static get state() {
    return cy.get("#mat-input-7");
  }

  static get submitButton() {
    return cy.contains("Submit");
  }
}
