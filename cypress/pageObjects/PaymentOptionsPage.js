import { BasePage } from "./BasePage";

export class PaymentOptionsPage extends BasePage {
  static selectCardEnding(digits) {
    return cy.contains(digits).click();
  }

  static get continueButton() {
    return cy.contains("Continue");
  }
}
