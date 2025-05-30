export class BasketPage {
  static goToBasket() {
    cy.get('[aria-label="Show the shopping cart"]').click();
  }

  static checkout() {
    cy.contains("Checkout").click();
  }
}
