import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static dismissBanner() {
    return cy.get("[aria-label='Close Welcome Banner']").click();
  }

  static acceptCookies() {
    return cy.get("[aria-label='dismiss cookie message']").click();
  }

  static goToRegister() {
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.contains("Not yet a customer?").click();
  }
}

}
