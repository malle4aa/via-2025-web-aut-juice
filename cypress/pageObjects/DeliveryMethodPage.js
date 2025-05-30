export class DeliveryMethodPage {
  static selectStandard() {
    cy.contains("Standard Delivery").click();
    cy.contains("Continue").click();
  }
}
