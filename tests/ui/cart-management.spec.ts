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
  // Go to shop page
  await headerPage.goToShopProduct();

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

test("Verify total is correct when add products and increase quantity", async ({
  page,
}) => {
  // Go to shop page
  await headerPage.goToShopProduct();

  // Make sure badge doesn't starts with any number
  await expect(headerPage.getBadgeNumber()).toBeEmpty();

  // Add first product
  const prodName1 = "Brazilian Santos";
  const prodPrice1 = 22.99;
  await shopPage.addProductByName(prodName1);

  // Validate badge icon shows '1'
  await expect(headerPage.getBadgeNumber()).toHaveText("1");

  // Add second product
  const prodName2 = "Colombian Supreme";
  const prodPrice2 = 23.99;
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

  // Click to increase product quantity button
  const plusButtons = await cartPage.getIncreaseButtonQtyLocator().all();

  // Click to increase in 2 the product quantity
  for (const button of plusButtons) {
    await button.click();
  }

  // Validate sub total shows the correct price
  const subTotal = (prodPrice1 * 2 + prodPrice2 * 2).toFixed(2);
  await expect(
    cartPage.getSubtotalLocator().filter({ hasText: subTotal.toString() }),
  ).toBeVisible();
});

test("Verify cart badge is updated when remove multiple products", async ({
  page,
}) => {
  // Go to shop page
  await headerPage.goToShopProduct();

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

  // Remove both products
  await cartPage.clickToRemoveAllProducts();

  // Validate badge number is empty
  await expect(headerPage.getBadgeNumber()).toBeEmpty();
});
