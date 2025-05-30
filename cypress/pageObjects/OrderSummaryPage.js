export class OrderSummaryPage {
  static placeOrder() {
    cy.contains("Place your order and pay").click();
  }
}
