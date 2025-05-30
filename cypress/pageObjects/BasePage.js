export class BasePage {
  static visit() {
    cy.log(`Visiting: ${this.url}`);
    return cy.visit(this.url, { failOnStatusCode: false, timeout: 100000 });
  }
}
