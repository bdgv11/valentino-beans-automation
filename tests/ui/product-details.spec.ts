import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../pages/headerPage";
import { ShopPage } from "../../pages/shopPage";
import { CartPage } from "../../pages/cartPage";
import { CheckoutPage } from "../../pages/checkoutPage";
import { OrderConfirmationPage } from "../../pages/orderConfirmationPage";
import { ContactAndTrackOrderPage } from "../../pages/contactAndTrackOrderPage";
import { OrderDetailsPage } from "../../pages/orderDetailsPage";
import { DetailsPage } from "../../pages/detailsPage";

let headerPage: HeaderPage;
let shopPage: ShopPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let orderConfirmationPage: OrderConfirmationPage;
let trackOrderPage: ContactAndTrackOrderPage;
let orderDetailsPage: OrderDetailsPage;
let detailsPage: DetailsPage;

test.beforeEach(async ({ page }) => {
  await page.goto("");
  headerPage = new HeaderPage(page);
  shopPage = new ShopPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  orderConfirmationPage = new OrderConfirmationPage(page);
  trackOrderPage = new ContactAndTrackOrderPage(page);
  orderDetailsPage = new OrderDetailsPage(page);
  detailsPage = new DetailsPage(page);
});

test("Verify product name and price consistency between shop list and detail page", async ({
  page,
}) => {
  // Go to shop age
  await headerPage.goToShopProduct();

  // Get the name, description and price of a product
  const index = 2;
  const prodName =
    (await shopPage.getProductNameByIndex(index).textContent()) || "";
  const prodDescription =
    (await shopPage.getProductDescriptionByIndex(index).textContent()) || "";
  const prodPrice =
    (await shopPage.getProductPriceByIndex(index).textContent())?.trim() || "";

  // Click on details
  await shopPage.clickOnViewDetailsByIndex(index);

  // Validate that name, description and price are showed in the details page
  await expect(detailsPage.getProductTitleLocator()).toHaveText(prodName);
  await expect(detailsPage.getProductDescriptionLocator()).toHaveText(
    prodDescription,
  );
  await expect(detailsPage.getProductPriceLocator()).toHaveText(prodPrice);
});
