export class PaymentOptionPage {
  static selectCardEndingWith(digits) {
    cy.contains(new RegExp(`\\*\\*\\*\\*${digits}$`)).click();
    cy.contains("Continue").click();
  }
}
