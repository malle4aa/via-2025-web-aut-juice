export class OrderCompletionPage {
  static confirmation() {
    return cy.contains("Thank you for your purchase!");
  }
}
