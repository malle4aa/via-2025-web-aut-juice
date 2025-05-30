export class ProductCardPage {
  static selectProduct(name) {
    cy.get("mat-card", { timeout: 10000 }).contains(name).click();
  }

  static get productDescription() {
    return cy.get(".mat-dialog-content");
  }

  static get closeButton() {
    return cy.get("button[aria-label='Close Dialog']");
  }

  static waitForCards(min = 1) {
    cy.get("mat-card", { timeout: 10000 }).should("have.length.at.least", min);
  }

  static changeItemsPerPage(label) {
    cy.get("mat-select").first().click(); // simpler & safer
    cy.get("mat-option").contains(label).click();
  }

  static get expandReview() {
    return cy.get("mat-expansion-panel").first();
  }

  static get reviewContent() {
    return cy.get("mat-panel-description");
  }

  static get reviewField() {
    return cy.get("textarea[aria-label='Text field to review a product']");
  }

  static get submitReviewButton() {
    return cy.get("button#submitButton");
  }
}
