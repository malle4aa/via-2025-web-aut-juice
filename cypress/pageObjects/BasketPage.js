export class BasketPage {
  static checkout() {
    cy.contains("Checkout").click();
  }
}
