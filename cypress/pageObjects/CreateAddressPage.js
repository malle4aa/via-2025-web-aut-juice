export class CreateAddressPage {
  static fillAddress({ country, name, mobile, zip, address, city }) {
    cy.get("input[placeholder='Please provide a country.']").type(country);
    cy.get("input[placeholder='Please provide a name.']").type(name);
    cy.get("input[placeholder='Please provide a mobile number.']").type(mobile);
    cy.get("input[placeholder='Please provide a ZIP code.']").type(zip);
    cy.get("textarea[placeholder='Please provide an address.']").type(address);
    cy.get("input[placeholder='Please provide a city.']").type(city);
  }

  static submitButton() {
    return cy.contains("Submit");
  }
}
