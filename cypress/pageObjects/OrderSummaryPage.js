import { BasePage } from "./BasePage";

export class OrderSummaryPage extends BasePage {
  static get placeOrderButton() {
    return cy.contains("Place your order and pay");
  }
}
