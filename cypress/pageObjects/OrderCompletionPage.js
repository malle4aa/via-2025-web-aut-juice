export class OrderCompletionPage {
  static verifyConfirmation() {
    cy.contains("Thank you for your purchase!").should("be.visible");
  }
}
