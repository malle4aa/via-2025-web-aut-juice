export class PaymentOptionsPage {
  static selectCard(ending) {
    cy.contains(ending).click();
  }

  static continueButton() {
    return cy.contains("Continue");
  }
}
