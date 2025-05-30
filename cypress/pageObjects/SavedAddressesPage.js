import { BasePage } from "./BasePage";

export class SavedAddressesPage extends BasePage {
  static get addNewAddressButton() {
    return cy.contains("Add New Address");
  }

  static get addressCard() {
    return cy.get(".mat-card");
  }
}
