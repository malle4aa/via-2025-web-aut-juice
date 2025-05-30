import { HomePage } from "../pageObjects/HomePage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      cy.get("#navbarAccount").click();
      cy.get("#navbarLoginButton").click();
      cy.get("#email").type("demo");
      cy.get("#password").type("demo");
      cy.get("#loginButton").click();
      cy.get("#navbarAccount").click();
      cy.get(".mat-menu-content").should("contain", "demo");
    });

    it("Registration", () => {
      const rand = Math.floor(Math.random() * 10000);
      const email = `user_${rand}@ebox.com`;
      const password = "Test1234";

      cy.get("#navbarAccount").click();
      cy.get("#navbarLoginButton").click();
      cy.get("a[routerlink='/register']").click();
      cy.get("#emailControl").type(email);
      cy.get("#passwordControl").type(password);
      cy.get("#repeatPasswordControl").type(password);
      cy.get(".mat-select-placeholder").click();
      cy.get(".mat-option").contains("Name of your favorite pet?").click();
      cy.get("#securityAnswerControl").type("Doggo");
      cy.get("#registerButton").click();

      cy.get("#email").type(email);
      cy.get("#password").type(password);
      cy.get("#loginButton").click();
      cy.get("#navbarAccount").click();
      cy.get(".mat-menu-content").should("contain", email);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("Lemon{enter}");
      cy.contains("Lemon Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate multiple cards", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("500ml{enter}");

      cy.contains("Eggfruit Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Now with even more exotic flavour.");
      cy.get("button[aria-label='Close Dialog']").click();

      cy.contains("Lemon Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
      cy.get("button[aria-label='Close Dialog']").click();

      cy.contains("Strawberry Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sweet & tasty!");
    });

    it("Read a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("King{enter}");
      cy.contains('OWASP Juice Shop "King of the Hill" Facemask').click();
      cy.get(".mat-expansion-panel-header").click();
      cy.get(".review-text").should("contain", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
    });

    it("Add a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("Raspberry{enter}");
      cy.contains("Raspberry Juice (1000ml)").click();
      cy.get("#comment").type("Tastes like metal");
      cy.contains("Submit").click();
      cy.get(".mat-expansion-panel-header").click();
      cy.get(".review-text").should("contain", "Tastes like metal");
    });

    it("Validate product card amount", () => {
      cy.get(".mat-grid-tile").should("have.length", 12);
      cy.get("mat-select[aria-label='Items per page']").click();
      cy.get("mat-option").contains("24").click();
      cy.get(".mat-grid-tile").should("have.length", 24);
      cy.get("mat-select[aria-label='Items per page']").click();
      cy.get("mat-option").contains("36").click();
      cy.get(".mat-grid-tile").should("have.length", 35);
    });

    it("Buy Girlie T-shirt", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("Girlie{enter}");
      cy.contains("Add to Basket").click();
      cy.get('[aria-label="Show the shopping cart"]').click();

      BasketPage.checkout();
      SelectAddressPage.selectFakedom();
      DeliveryMethodPage.selectStandard();
      PaymentOptionsPage.selectCardEndingWith("5678");
      OrderSummaryPage.placeOrder();
      OrderCompletionPage.verifyConfirmation();
    });

    it("Add address (no page object)", () => {
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

    it("Add payment option (no page object)", () => {
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
});
