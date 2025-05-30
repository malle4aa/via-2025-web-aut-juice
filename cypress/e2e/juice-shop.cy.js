// cypress/e2e/juice-shop.cy.js
import { HomePage } from "../pageObjects/HomePage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { LoginPage } from "../pageObjects/LoginPage";


// A test to validate each page object is functioning
// This test flow logs in, buys a product, and completes checkout, touching all 9 page objects

describe("Juice Shop Full Flow Test - All Page Objects", () => {
  beforeEach(() => {
    cy.login("demo", "demo");
    HomePage.visit();
    cy.get(".mat-search_icon-search").click();
    cy.get("#searchQuery").type("Girlie{enter}");
    cy.contains("Add to Basket").click();
    cy.get('[aria-label="Show the shopping cart"]').click();
  });

  it("Runs through all page objects", () => {
    // Use BasketPage
    BasketPage.checkout();

    // Use SelectAddressPage
    SelectAddressPage.selectFakedom();

    // Use DeliveryMethodPage
    DeliveryMethodPage.selectStandard();

    // Use PaymentOptionsPage
    PaymentOptionsPage.selectCardEndingWith("5678");

    // Use OrderSummaryPage
    OrderSummaryPage.placeOrder();

    // Use OrderCompletionPage
    OrderCompletionPage.verifyConfirmation();

    // Reuse HomePage
    HomePage.visit();
    cy.get(".mat-toolbar").should("contain", "OWASP Juice Shop");

    // Use LoginPage for log out
    cy.get("#navbarAccount").click();
    cy.contains("Logout").click();
    LoginPage.visit();
    LoginPage.emailField.should("be.visible");
  });
});
