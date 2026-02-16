import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../pages/headerPage";
import { ShopPage } from "../../pages/shopPage";
import { CartPage } from "../../pages/cartPage";
import { CheckoutPage } from "../../pages/checkoutPage";
import { RandomCheckoutData } from "../../utils/checkout.data";
import { OrderConfirmationPage } from "../../pages/orderConfirmationPage";
import { ContactAndTrackOrderPage } from "../../pages/contactAndTrackOrderPage";
import { OrderDetailsPage } from "../../pages/orderDetailsPage";

let headerPage: HeaderPage;
let shopPage: ShopPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let orderConfirmationPage: OrderConfirmationPage;
let trackOrderPage: ContactAndTrackOrderPage;
let orderDetailsPage: OrderDetailsPage;

test.beforeEach(async ({ page }) => {
  await page.goto("");
  headerPage = new HeaderPage(page);
  shopPage = new ShopPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  orderConfirmationPage = new OrderConfirmationPage(page);
  trackOrderPage = new ContactAndTrackOrderPage(page);
  orderDetailsPage = new OrderDetailsPage(page);
});

test("Verify cart badge and drawer update when adding multiple products", async ({
  page,
}) => {
  // Make sure badge doesn't starts with any number
  await expect(headerPage.getBadgeNumber()).toBeEmpty();

  // Add first product
  const prodName1 = "Brazilian Santos";
  await shopPage.addProductByName(prodName1);

  // Validate badge icon shows '1'
  await expect(headerPage.getBadgeNumber()).toHaveText("1");

  // Add second product
  const prodName2 = "Colombian Supreme";
  await shopPage.addProductByName(prodName2);

  // Validate badge icon shows '2'
  await expect(headerPage.getBadgeNumber()).toHaveText("2");

  // Click on cart button
  await headerPage.clickOnCartButton();

  // Verify that fist & second product names are displayed
  await expect(
    cartPage.getProductNameLocator().filter({ hasText: prodName1 }),
  ).toBeVisible();
  await expect(
    cartPage.getProductNameLocator().filter({ hasText: prodName2 }),
  ).toBeVisible();
});
