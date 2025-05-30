import { BasePage } from "./BasePage";

export class SavedPaymentMethodsPage extends BasePage {
  static get addNewCardButton() {
    return cy.contains("Add new card");
  }

  static get name() {
    return cy.get("#mat-input-1");
  }

  static get cardNumber() {
    return cy.get("#mat-input-2");
  }

  static get expiryMonth() {
    return cy.get("#mat-input-3");
  }

  static get expiryYear() {
    return cy.get("#mat-input-4");
  }

  static get submitButton() {
    return cy.contains("Submit");
  }

  static get cardItem() {
    return cy.get(".mat-card");
  }
}
