export class SearchPage {
  static get searchIcon() {
    return cy.get("mat-icon").contains("search").first(); // reliable selector
  }

  static get searchField() {
    return cy.get("input#searchQuery"); // updated!
  }

  static search(term) {
    this.searchIcon.should("exist").click({ force: true });
    cy.wait(500); // wait for UI animation
    this.searchField.should("exist").type(`${term}{enter}`, { delay: 50 });
  }
}
