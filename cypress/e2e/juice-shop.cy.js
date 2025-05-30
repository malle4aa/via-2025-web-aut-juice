import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionPage } from "../pageObjects/PaymentOptionPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";

describe("Juice Shop - Full Test Suite", () => {
  before(() => {
    cy.session("login", () => {
      cy.login("demo", "demo");
    });
  });

  beforeEach(() => {
    cy.visit("/");
    HomePage.dismissWelcomeBanner();
    HomePage.dismissCookieBanner();
  });

  it("Verify login from UI", () => {
    HomePage.openLogin();
    LoginPage.login("demo", "demo");
    HomePage.verifyUserLoggedIn("demo");
  });

  it("Search and view Lemon Juice", () => {
    HomePage.searchProduct("Lemon");
    cy.contains("Lemon Juice (500ml)").click();
    cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
  });

  it("Add review for product", () => {
    HomePage.searchProduct("Raspberry");
    cy.contains("Raspberry Juice (1000ml)").click();
    cy.get("#comment").type("Tastes like metal");
    cy.contains("Submit").click();
    cy.get(".mat-expansion-panel-header").click();
    cy.get(".review-text").should("contain", "Tastes like metal");
  });

  it("Validate pagination product card count", () => {
    cy.get(".mat-grid-tile").should("have.length", 12);
    cy.get("mat-select[aria-label='Items per page']").click();
    cy.get("mat-option").contains("24").click();
    cy.get(".mat-grid-tile").should("have.length", 24);
    cy.get("mat-select[aria-label='Items per page']").click();
    cy.get("mat-option").contains("36").click();
    cy.get(".mat-grid-tile").should("have.length", 35); // Expected amount for 36 may differ
  });

  it("Place full order for Girlie T-shirt", () => {
    HomePage.searchProduct("Girlie");
    HomePage.addToBasket("Girlie");
    BasketPage.goToBasket();
    BasketPage.checkout();
    SelectAddressPage.selectFakedom();
    DeliveryMethodPage.selectStandard();
    PaymentOptionPage.selectCardEndingWith("5678");
    OrderSummaryPage.placeOrder();
    OrderCompletionPage.verifyConfirmation();
  });

  it("Add new address", () => {
    cy.get("#navbarAccount").click();
    cy.contains("Orders & Payment").click();
    cy.contains("My saved addresses").click();
    cy.contains("Add New Address").click();
    cy.get("#mat-input-1").type("Test");
    cy.get("#mat-input-2").type("User");
    cy.get("#mat-input-3").type("Street 1");
    cy.get("#mat-input-4").type("12345");
    cy.get("#mat-input-5").type("City");
    cy.get("#mat-input-6").type("Country");
    cy.get("button#submitButton").click();
    cy.get(".mat-cell").should("contain", "Street 1");
  });

  it("Add new payment method", () => {
    cy.get("#navbarAccount").click();
    cy.contains("Orders & Payment").click();
    cy.contains("My payment options").click();
    cy.contains("Add new card").click();
    cy.get("#mat-input-1").type("Test User");
    cy.get("#mat-input-2").type("1234567812345678");
    cy.get("#mat-input-3").type("7");
    cy.get("#mat-input-4").type("2090");
    cy.get("#submitButton").click();
    cy.get(".mat-cell").should("contain", "****5678");
  });
});
