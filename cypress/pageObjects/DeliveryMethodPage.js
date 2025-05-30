export class DeliveryMethodPage {
  static selectStandardDelivery() {
    cy.contains("Standard Delivery").click();
  }

  static continueButton() {
    return cy.contains("Continue");
  }
}
