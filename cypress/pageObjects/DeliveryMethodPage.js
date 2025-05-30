import { BasePage } from "./BasePage";

export class DeliveryMethodPage extends BasePage {
  static selectStandardDelivery() {
    cy.contains("Standard Delivery").click();
  }

  static get continueButton() {
    return cy.contains("Continue");
  }
}
