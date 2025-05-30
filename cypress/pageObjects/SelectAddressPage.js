export class SelectAddressPage {
  static selectFakedom() {
    cy.contains("United Fakedom").click();
    cy.contains("Continue").click();
  }
}
