export class BasePage {
  static visit(path = "/#/") {
    return cy.visit(path);
  }
}
