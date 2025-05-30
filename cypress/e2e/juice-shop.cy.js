// cypress/e2e/juice-shop.cy.js
import { HomePage } from "../pageObjects/HomePage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";
import { CreateAddressPage } from "../pageObjects/CreateAddressPage";
import { SavedPaymentMethodsPage } from "../pageObjects/SavedPaymentMethodsPage";

function generateEmail() {
  const rand = Math.floor(Math.random() * 100000);
  return `email_${rand}@ebox.com`;
}

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      cy.get("button[aria-label='Show/hide account menu']").click();
      cy.get("button[aria-label='Show Login dialog']").click();
      cy.get("input#email").type("demo");
      cy.get("input#password").type("demo");
      cy.get("button#loginButton").click();
      cy.get("button[aria-label='Show/hide account menu']").click();
      cy.contains("demo").should("exist");
    });

    it("Registration", () => {
      const email = generateEmail();
      const password = "Test1234";
      cy.get("button[aria-label='Show/hide account menu']").click();
      cy.get("button[aria-label='Show Login dialog']").click();n      cy.contains("Not yet a customer?").click();
      cy.get("input#emailControl").type(email);
      cy.get("input#passwordControl").type(password);
      cy.get("input#repeatPasswordControl").type(password);
      cy.get("mat-select[name='securityQuestion']").click();
      cy.contains("Name of your favorite pet?").click();
      cy.get("input#securityAnswerControl").type("Fluffy");
      cy.get("button#registerButton").click();
      cy.get("input#email").type(email);
      cy.get("input#password").type(password);
      cy.get("button#loginButton").click();
      cy.get("button[aria-label='Show/hide account menu']").click();
      cy.contains(email).should("exist");
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      cy.get("mat-icon[aria-label='Open search dialog']").click();
      cy.get("input#searchQuery").type("Lemon{enter}");
      cy.contains("Lemon Juice (500ml)").click();
      cy.contains("Sour but full of vitamins.").should("exist");
    });

    it("Search 500ml and validate Lemon", () => {
      cy.get("mat-icon[aria-label='Open search dialog']").click();
      cy.get("input#searchQuery").type("500ml{enter}");
      cy.contains("Lemon Juice (500ml)").click();
      cy.contains("Sour but full of vitamins.").should("exist");
    });

    it("Search 500ml and validate cards", () => {
      cy.get("mat-icon[aria-label='Open search dialog']").click();
      cy.get("input#searchQuery").type("500ml{enter}");
      cy.contains("Eggfruit Juice (500ml)").click();
      cy.contains("Now with even more exotic flavour.").should("exist");
      cy.get("button[aria-label='Close Dialog']").click();
      cy.contains("Lemon Juice (500ml)").click();
      cy.contains("Sour but full of vitamins.").should("exist");
      cy.get("button[aria-label='Close Dialog']").click();
      cy.contains("Strawberry Juice (500ml)").click();
      cy.contains("Sweet & tasty!").should("exist");
    });

    it("Read a review", () => {
      cy.get("mat-icon[aria-label='Open search dialog']").click();
      cy.get("input#searchQuery").type("King{enter}");
      cy.contains("King of the Hill").click();
      cy.get("mat-expansion-panel").click();
      cy.contains("K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!").should("exist");
    });

    it("Add a review", () => {
      cy.get("mat-icon[aria-label='Open search dialog']").click();
      cy.get("input#searchQuery").type("Raspberry{enter}");
      cy.contains("Raspberry Juice (1000ml)").click();
      cy.get("textarea[placeholder='What did you think?']").type("Tastes like metal");
      cy.get("button#submitButton").click();
      cy.get("mat-expansion-panel").click();
      cy.contains("Tastes like metal").should("exist");
    });

    it("Validate product card amount", () => {
      cy.get("mat-card").should("have.length", 12);
      cy.get("mat-select[aria-label='Items per page']").click();
      cy.contains("24").click();
      cy.get("mat-card").should("have.length", 24);
      cy.get("mat-select[aria-label='Items per page']").click();
      cy.contains("36").click();
      cy.get("mat-card").should("have.length", 35);
    });

    it("Buy Girlie T-shirt", () => {
      cy.get("mat-icon[aria-label='Open search dialog']").click();
      cy.get("input#searchQuery").type("Girlie{enter}");
      cy.contains("Add to Basket").click();
      cy.get("button[routerlink='/basket']").click();
      BasketPage.checkoutButton().click();
      SelectAddressPage.selectAddress("United Fakedom");
      SelectAddressPage.continueButton().click();
      DeliveryMethodPage.selectStandardDelivery();
      DeliveryMethodPage.continueButton().click();
      PaymentOptionsPage.selectCard("5678");
      PaymentOptionsPage.continueButton().click();
      OrderSummaryPage.placeOrderButton().click();
      OrderCompletionPage.confirmation().should("contain", "Thank you for your purchase!");
    });

    it("Add address", () => {
      cy.get("button[aria-label='Show/hide account menu']").click();
      cy.contains("Orders & Payment").click();
      cy.contains("My saved addresses").click();
      SavedAddressesPage.addAddressButton().click();
      CreateAddressPage.fillAddress({
        country: "Latvia",
        name: "Test User",
        mobile: "12345678",
        zip: "LV-1000",
        address: "Test Street 1",
        city: "Riga",
      });
      CreateAddressPage.submitButton().click();
      cy.contains("Test Street 1").should("exist");
    });

    it("Add payment option", () => {
      cy.get("button[aria-label='Show/hide account menu']").click();
      cy.contains("Orders & Payment").click();
      cy.contains("My payment options").click();
      SavedPaymentMethodsPage.addCardButton().click();
      SavedPaymentMethodsPage.fillCardDetails({
        name: "Test User",
        number: "1234123412345678",
        month: "7",
        year: "2090",
      });
      SavedPaymentMethodsPage.submitButton().click();
      cy.contains("**** **** **** 5678").should("exist");
    });
  });
});

