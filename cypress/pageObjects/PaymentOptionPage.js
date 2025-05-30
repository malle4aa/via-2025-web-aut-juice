export class PaymentOptionsPage {
  static selectCardEndingWith(digits) {
    cy.get(".payment-method-card")
      .contains(digits)
      .click();
    cy.contains("Continue").click();
  }
}
