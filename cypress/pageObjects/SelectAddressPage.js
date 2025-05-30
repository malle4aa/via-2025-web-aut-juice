export class SelectAddressPage {
  static selectAddress(name) {
    cy.contains(name).click();
  }

  static continueButton() {
    return cy.contains("Continue");
  }
}
