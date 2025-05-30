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
  });
});

