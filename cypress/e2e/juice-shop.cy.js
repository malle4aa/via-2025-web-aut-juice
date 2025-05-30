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
      const email = `email_${rand}@ebox.com`;
      const password = "Test1234";

      cy.get("#navbarAccount").click();
      cy.get("#navbarLoginButton").click();
      cy.contains("Not yet a customer?").click();

      cy.get("#emailControl").type(email);
      cy.get("#passwordControl").type(password);
      cy.get("#repeatPasswordControl").type(password);

      cy.get("[aria-label='Open security question']").click();
      cy.contains("Name of your favorite pet?").click();

      cy.get("#securityAnswerControl").type("Fluffy");
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

    it("Search 500ml and validate Lemon (multiple cards)", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("500ml{enter}");
      cy.contains("Lemon Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate cards", () => {
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
    });

    it("Read a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("King{enter}");
      cy.contains('OWASP Juice Shop "King of the Hill" Facemask').click();
      cy.get("[aria-label='Show Reviews']").click();
      cy.get(".mat-dialog-content").should("contain", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
    });

    it("Add a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("Raspberry{enter}");
      cy.contains("Raspberry Juice (1000ml)").click();
      cy.get("#mat-input-5").type("Tastes like metal");
      cy.contains("Submit").click();
      cy.get("[aria-label='Show Reviews']").click();
      cy.get(".mat-dialog-content").should("contain", "Tastes like metal");
    });

    it("Validate product card amount", () => {
      cy.get(".item-card").should("have.length", 12);

      cy.get("mat-select[aria-label='Items per page']").click();
      cy.contains("24").click();
      cy.get(".item-card").should("have.length", 24);

      cy.get("mat-select[aria-label='Items per page']").click();
      cy.contains("36").click();
      cy.get(".item-card").should("have.length", 35);
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

      BasketPage.clickAddNewAddress();
      SelectAddressPage.fillAddressForm({
        name: "John Doe",
        phone: "1234567890",
        country: "United Fakedom",
        city: "Fake City",
        zip: "12345",
        address: "123 Fake St"
      });
      BasketPage.submitAddress();

      cy.contains("United Fakedom").should("be.visible");
    });

    it("Add payment option", () => {
      cy.get("#navbarAccount").click();
      cy.contains("Orders & Payment").click();
      cy.contains("My payment options").click();

      PaymentOptionsPage.clickAddNewCard();
      PaymentOptionsPage.fillCardForm({
        name: "John Doe",
        number: "4111111111111111",
        expiryMonth: "7",
        expiryYear: "2090"
      });
      PaymentOptionsPage.submitCard();

      cy.contains("4111").should("be.visible");
    });
  });
});
