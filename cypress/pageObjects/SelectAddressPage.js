import { BasePage } from "./BasePage";

export class SelectAddressPage extends BasePage {
  static addressCard(text) {
    return cy.contains(text);
  }

  static get continueButton() {
    return cy.contains("Continue");
  }
}
