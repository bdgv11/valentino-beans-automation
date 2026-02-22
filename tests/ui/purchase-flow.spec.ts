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

test("Successful Purchase Flow (Guest) by product name", async ({ page }) => {
  // Variable of product name to select
  const prodName = "Brazilian Santos";
  const prodPrice = "22.99";
  const prodQuantity = "1";

  // Select a product by name
  await shopPage.addProductByName(prodName);

  // Assert successful msg displayed
  await shopPage.validateMsgProductAdded(prodName);

  // Click to cart button
  await headerPage.clickOnCartButton();

  // Assert name, price and quantity
  await expect(cartPage.getProductNameLocator()).toHaveText(prodName);
  await expect(cartPage.getProductPriceLocator()).toContainText(prodPrice);
  await expect(cartPage.getProductQuantityLocator()).toHaveText(prodQuantity);
  await expect(cartPage.getSubtotalLocator()).toContainText(prodPrice);

  // Click on proceed to checkout button
  await cartPage.clickOnCheckOutButton();

  // Fill all the checkout form
  await checkoutPage.clearAllFormFields();
  const checkoutData = RandomCheckoutData.generateCheckoutData();
  await checkoutPage.fillCheckoutForm(checkoutData);

  // Click on Place Order
  await checkoutPage.clickToPlaceOrder();

  // No error msgs are displayed
  await expect(checkoutPage.getErrorMsgLocator()).not.toBeVisible();

  // Order Confirmation page
  // Validate order is confirmed & email is correct
  await expect(orderConfirmationPage.getOrderConfirmedTitle()).toBeVisible();
  const orderId = await orderConfirmationPage.getOrderId();
  expect(orderId).toBeTruthy();
  await expect(
    orderConfirmationPage.validateConfirmationSentToEmail(),
  ).toContainText(checkoutData.email);

  // Go to Track Order page
  await orderConfirmationPage.clickToTrackYourOrder();

  // Fill the form to track order
  await trackOrderPage.typeOrderId(orderId!);
  await trackOrderPage.typeEmail(checkoutData.email);
  await trackOrderPage.clickOnTrackorder();

  // On Order Details page validate product name, quantity, client name and email displayed
  await expect(orderDetailsPage.getProductNameLocator(prodName)).toHaveText(
    prodName,
  );
  await expect(orderDetailsPage.getProductQuantity()).toContainText(
    prodQuantity,
  );
  await expect(orderDetailsPage.getProductPrice(prodPrice)).toContainText(
    prodPrice,
  );
  await expect(
    orderDetailsPage.getCustomerName(
      checkoutData.firstName,
      checkoutData.lastName,
    ),
  ).toBeVisible();

  await expect(
    orderDetailsPage.getCustomerEmail(checkoutData.email),
  ).toBeVisible();
});

test("Validate error msgs when try to checkout", async ({ page }) => {
  // Variable of product name to select
  const prodName = "Brazilian Santos";
  const prodPrice = "22.99";
  const prodQuantity = "1";

  // Select a product by name
  await shopPage.addProductByName(prodName);

  // Assert successful msg displayed
  await shopPage.validateMsgProductAdded(prodName);

  // Click to cart button
  await headerPage.clickOnCartButton();

  // Assert name, price and quantity
  await expect(cartPage.getProductNameLocator()).toHaveText(prodName);
  await expect(cartPage.getProductPriceLocator()).toContainText(prodPrice);
  await expect(cartPage.getProductQuantityLocator()).toHaveText(prodQuantity);
  await expect(cartPage.getSubtotalLocator()).toContainText(prodPrice);

  // Click on proceed to checkout button
  await cartPage.clickOnCheckOutButton();

  // Clear all form fields
  await checkoutPage.clearAllFormFields();

  // Click on Place Order
  await checkoutPage.clickToPlaceOrder();

  // Validate error msgs are displayed
  const expectedErrors = [
    "First name is required.",
    "Last name is required.",
    "Please enter a valid email.",
    "Address is required.",
    "City is required.",
    "ZIP code must be 5 digits.",
    "Country is required.",
    "Name on card is required.",
    "Please enter a valid 16-digit card number.",
    "Expiry must be in MM/YY format.",
    "CVC must be 3 or 4 digits.",
  ];
  for (const error of expectedErrors) {
    await expect(
      checkoutPage.getErrorMsgLocator().filter({ hasText: error }),
    ).toBeVisible();
  }

  expect(page).toHaveURL("/checkout");
});
