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

    it("Search 500ml and validate cards", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("500ml{enter}");
      cy.contains("Eggfruit Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Now with even more exotic flavour.");
      cy.get(".mat-dialog-container button[aria-label='Close Dialog']").click();

      cy.contains("Lemon Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sour but full of vitamins.");
      cy.get(".mat-dialog-container button[aria-label='Close Dialog']").click();

      cy.contains("Strawberry Juice (500ml)").click();
      cy.get(".mat-dialog-content").should("contain", "Sweet & tasty!");
    });

    it("Read a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("King{enter}");
      cy.contains("OWASP Juice Shop \"King of the Hill\" Facemask").click();
      cy.get("[aria-label='Expand for Reviews']").click();
      cy.get(".review-text").should("contain", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
    });

    it("Add a review", () => {
      cy.get(".mat-search_icon-search").click();
      cy.get("#searchQuery").type("Raspberry{enter}");
      cy.contains("Raspberry Juice (1000ml)").click();
      cy.get("textarea[aria-label='Text field to review a product']").type("Tastes like metal");
      cy.contains("Submit").click();
      cy.get("[aria-label='Expand for Reviews']").click();
      cy.get(".review-text").should("contain", "Tastes like metal");
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
      SavedAddressesPage.clickAddAddress();
      CreateAddressPage.fillAddress();
      CreateAddressPage.submit();
      SavedAddressesPage.verifyNewAddress();
    });

    it("Add payment option", () => {
      cy.get("#navbarAccount").click();
      cy.contains("Orders & Payment").click();
      cy.contains("My payment options").click();
      SavedPaymentMethodsPage.clickAddCard();
      SavedPaymentMethodsPage.fillCardInfo("John Doe", "1234123412345678", 7, 2090);
      SavedPaymentMethodsPage.submit();
      SavedPaymentMethodsPage.verifyCard("5678");
    });
  });
});

        number: "4111111111111111",
        expiryMonth: "7",
        expiryYear: "2090"
      });
      PaymentOptionsPage.submitCard();

      cy.contains("4111").should("be.visible");
    });
  });
});
