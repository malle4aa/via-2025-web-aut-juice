export class SavedPaymentMethodsPage {
  static addCardButton() {
    return cy.contains("Add new card");
  }

  static fillCardDetails({ name, number, month, year }) {
    cy.get("input[placeholder='Please enter the name on your card']").type(name);
    cy.get("input[placeholder='Please enter your card number']").type(number);
    cy.get("select[name='month']").select(month);
    cy.get("select[name='year']").select(year);
  }

  static submitButton() {
    return cy.contains("Submit");
  }
}
