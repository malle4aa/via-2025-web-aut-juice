import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { SearchPage } from "../pageObjects/SearchPage";
import { ProductCardPage } from "../pageObjects/ProductCardPage";
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
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      HomePage.accountButton.click();
      HomePage.loginButton.should("be.visible").click();

      LoginPage.emailField.should("exist").should("be.visible").type("demo");
      LoginPage.passwordField.should("be.visible").type("demo");
      LoginPage.loginSubmitButton.click();

      HomePage.accountButton.click();
      HomePage.loggedInUser.should("contain", "demo");
    });


    it("Registration", () => {
      const random = Math.floor(Math.random() * 100000);
      const email = `email_${random}@ebox.com`;
      const password = "Password123";

      HomePage.accountButton.click();
      HomePage.loginButton.click();
      LoginPage.notYetCustomerLink.click();

      RegistrationPage.emailField.type(email);
      RegistrationPage.passwordField.type(password);
      RegistrationPage.repeatPasswordField.type(password);
      RegistrationPage.securityQuestionDropdown.should("be.visible").click();
      cy.wait(500); // optional
      cy.contains("mat-option", "Name of your favorite pet?").click({ force: true });

      RegistrationPage.securityAnswerField.type("Fluffy");
      RegistrationPage.registerButton.click();

      LoginPage.emailField.type(email);
      LoginPage.passwordField.type(password);
      LoginPage.loginSubmitButton.click();
      HomePage.accountButton.click();
      HomePage.loggedInUser.should("contain", email);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
       SearchPage.search("Lemon");

      // Wait until a mat-card appears and contains expected text
      cy.get("mat-card").should("have.length.greaterThan", 0);
      cy.contains("mat-card", "Lemon Juice (500ml)").should("be.visible").click();
     
      ProductCardPage.productDescription.should("contain", "Sour but full of vitamins.");
    });




    it("Search 500ml and validate Lemon", () => {
      SearchPage.search("500ml");
      ProductCardPage.selectProduct("Lemon Juice (500ml)");
      ProductCardPage.productDescription.should("contain", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate Lemon", () => {
     SearchPage.search("Lemon");

    cy.get("mat-card", { timeout: 10000 }).should("exist"); // wait up to 10s
    cy.contains("mat-card", "Lemon Juice (500ml)").should("be.visible").click();

    ProductCardPage.productDescription.should("contain", "Sour but full of vitamins.");

    });

    it("Read a review", () => {
      SearchPage.search("King");
      ProductCardPage.selectProduct('OWASP Juice Shop "King of the Hill" Facemask');
      ProductCardPage.expandReview.click();
      ProductCardPage.reviewContent.should("contain", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
    });

    it("Add a review", () => {
      SearchPage.search("Raspberry");
      ProductCardPage.selectProduct("Raspberry Juice (1000ml)");
      ProductCardPage.reviewField.type("Tastes like metal");
      ProductCardPage.submitReviewButton.click();
      ProductCardPage.expandReview.click();
      ProductCardPage.reviewContent.should("contain", "Tastes like metal");
    });

    it("Validate product card amount", () => {
      ProductCardPage.productCards.should("have.length", 12);
      ProductCardPage.changeItemsPerPage("24");
      ProductCardPage.productCards.should("have.length", 24);
      ProductCardPage.changeItemsPerPage("36");
      ProductCardPage.productCards.should("have.length", 35);
    });

    it("Buy Girlie T-shirt", () => {
      SearchPage.search("Girlie");
      ProductCardPage.addToBasket("Girlie");
      BasketPage.basketButton.click();
      BasketPage.checkoutButton.click();

      SelectAddressPage.addressCard("United Fakedom").click();
      SelectAddressPage.continueButton.click();

      DeliveryMethodPage.selectStandardDelivery();
      DeliveryMethodPage.continueButton.click();

      PaymentOptionsPage.selectCardEnding("5678");
      PaymentOptionsPage.continueButton.click();

      OrderSummaryPage.placeOrderButton.click();
      OrderCompletionPage.confirmationMessage.should("contain", "Thank you for your purchase!");
    });

    it("Add address", () => {
      HomePage.accountButton.click();
      cy.contains("Orders & Payment").click();
      cy.contains("My saved addresses").click();
      SavedAddressesPage.addNewAddressButton.click();

      CreateAddressPage.country.type("Testland");
      CreateAddressPage.name.type("John Doe");
      CreateAddressPage.mobileNumber.type("1234567890");
      CreateAddressPage.zipCode.type("12345");
      CreateAddressPage.address.type("42 Cypress Street");
      CreateAddressPage.city.type("Testville");
      CreateAddressPage.state.type("TS");
      CreateAddressPage.submitButton.click();

      SavedAddressesPage.addressCard.should("contain", "John Doe");
    });

    it("Add payment option", () => {
      HomePage.accountButton.click();
      cy.contains("Orders & Payment").click();
      cy.contains("My payment options").click();
      SavedPaymentMethodsPage.addNewCardButton.click();

      SavedPaymentMethodsPage.name.type("John Doe");
      SavedPaymentMethodsPage.cardNumber.type("4111111111115678");
      SavedPaymentMethodsPage.expiryMonth.select("7");
      SavedPaymentMethodsPage.expiryYear.select("2090");
      SavedPaymentMethodsPage.submitButton.click();

      SavedPaymentMethodsPage.cardItem.should("contain", "5678");
    });
  });
});
