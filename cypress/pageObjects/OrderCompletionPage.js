import { BasePage } from "./BasePage";

export class OrderCompletionPage extends BasePage {
  static get confirmationMessage() {
    return cy.contains("Thank you for your purchase!");
  }
}
