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
      HomePage.dismissBanner();
      HomePage.acceptCookies();
    });

    it("Login", () => {
      cy.login("demo", "demo");
      cy.get("#navbarAccount").click();
      cy.get(".mat-menu-content").should("contain", "demo");
    });

    it("Registration", () => {
      const rand = Math.floor(Math.random() * 10000);
      const email = `email_${rand}@ebox.com`;
      const password = "Test1234";

      HomePage.goToRegister();
      cy.register(email, password);
      cy.login(email, password);

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

    it("Search 500ml and validate Lemon", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("500ml{enter}");
      cy.contains("Lemon Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate multiple cards", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("500ml{enter}");

      cy.contains("Eggfruit Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Now with even more exotic flavour.");
      cy.get(".mat-dialog-close").click();

      cy.contains("Lemon Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
      cy.get(".mat-dialog-close").click();

      cy.contains("Strawberry Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sweet & tasty!");
      cy.get(".mat-dialog-close").click();
    });

    it("Read a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("King{enter}");
      cy.contains('OWASP Juice Shop "King of the Hill" Facemask').click();
      cy.get(".mat-expansion-panel-header").contains("Reviews").click();
      cy.get(".mat-expansion-panel-body").should(
        "contain",
        "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!"
      );
    });

    it("Add a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("Raspberry{enter}");
      cy.contains("Raspberry Juice (1000ml)").click();

      const reviewText = "Tastes like metal";
      cy.get("textarea[aria-label='Add a review']").type(reviewText);
      cy.contains("Submit").click();

      cy.get(".mat-expansion-panel-header").contains("Reviews").click();
      cy.get(".mat-expansion-panel-body").should("contain", reviewText);
    });

    it("Validate product card amount", () => {
      cy.get(".mat-card").should("have.length", 12);

      cy.get("mat-select[aria-label='Items per page']").click();
      cy.get("mat-option").contains("24").click();
      cy.get(".mat-card").should("have.length", 24);

      cy.get("mat-select[aria-label='Items per page']").click();
      cy.get("mat-option").contains("36").click();
      cy.get(".mat-card").should("have.length", 35);
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

    it("Add address", () => {
      cy.get("#navbarAccount").click();
      cy.contains("Orders & Payment").click();
      cy.contains("My saved addresses").click();

      // SavedAddressesPage methods here if you create them
      cy.contains("Add New Address").click();

      // Fill new address form
      cy.get('input[formcontrolname="country"]').type("United Fakedom");
      cy.get('input[formcontrolname="name"]').type("Test User");
      cy.get('input[formcontrolname="mobile"]').type("1234567890");
      cy.get('input[formcontrolname="zip"]').type("12345");
      cy.get('input[formcontrolname="city"]').type("Faketown");
      cy.get('input[formcontrolname="address"]').type("123 Fakedom St");
      cy.contains("Submit").click();

      cy.contains("United Fakedom").should("exist");
    });

    it("Add payment option", () => {
      cy.get("#navbarAccount").click();
      cy.contains("Orders & Payment").click();
      cy.contains("My payment options").click();

      cy.contains("Add new card").click();

      cy.get('input[formcontrolname="name"]').type("Test User");
      cy.get('input[formcontrolname="cardNumber"]').type("4111111111115678");
      cy.get('mat-select[formcontrolname="expiryMonth"]').click();
      cy.get("mat-option").contains("7").click();
      cy.get('mat-select[formcontrolname="expiryYear"]').click();
      cy.get("mat-option").contains("2090").click();
      cy.contains("Submit").click();

      cy.contains("5678").should("exist");
    });
  });
});
