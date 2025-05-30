import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionPage } from "../pageObjects/PaymentOptionPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";

describe("Juice Shop Full Flow Test", () => {
  before(() => {
    cy.visit("/");
    HomePage.dismissWelcomeBanner();
    HomePage.dismissCookieBanner();
  });

  it("Login using page object", () => {
    HomePage.openLogin();
    LoginPage.login("demo", "demo");
    HomePage.verifyUserLoggedIn("demo");
  });

  it("Add product to basket and checkout", () => {
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
});
