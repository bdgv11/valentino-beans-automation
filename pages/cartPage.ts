import { test, Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly productNameTitle: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly subTotal: Locator;
  readonly proceedToCheckOutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Products
    this.productNameTitle = page.locator(".text-lg.font-semibold");
    this.productPrice = page.locator(".p-6 .font-bold").first();
    this.productQuantity = page.locator(
      'span[class="w-8 text-center font-semibold"]',
    );

    // Order Summary
    this.subTotal = page.locator('span[class="font-semibold"]').first();
    this.proceedToCheckOutButton = page.getByRole("button", {
      name: "Proceed to Checkout",
    });
  }

  getProductNameLocator() {
    return this.productNameTitle;
  }

  getProductPriceLocator() {
    return this.productPrice;
  }

  getProductQuantityLocator() {
    return this.productQuantity;
  }

  getSubtotalLocator() {
    return this.subTotal;
  }

  async clickOnCheckOutButton() {
    await this.proceedToCheckOutButton.click();
  }
}
