import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  static dismissWelcomeBanner() {
    cy.get("[aria-label='Close Welcome Banner']").click({ force: true });
  }

  static dismissCookieBanner() {
    cy.get("[aria-label='dismiss cookie message']").click({ force: true });
  }

  static openLogin() {
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
  }

  static verifyUserLoggedIn(username) {
    cy.get("#navbarAccount").click();
    cy.get(".mat-menu-content").should("contain", username);
  }

  static searchProduct(name) {
    cy.get(".mat-search_icon-search").click();
    cy.get("#searchQuery").type(`${name}{enter}`);
  }

  static addToBasket(productName) {
    cy.contains(productName).parents("mat-card").within(() => {
      cy.contains("Add to Basket").click();
    });
  }
}

