import { BasePage } from "./BasePage";

export class BasketPage extends BasePage {
  static get basketButton() {
    return cy.get("button[aria-label='Show the shopping cart']");
  }

  static get checkoutButton() {
    return cy.contains("Checkout");
  }
}
