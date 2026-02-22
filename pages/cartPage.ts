import { test, Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly productNameTitle: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly increaseProductQtyButton: Locator;
  readonly removeProductButton: Locator;
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
    this.increaseProductQtyButton = page.locator(
      'button[data-test-id^="quantity-increase-"]',
    );
    ((this.removeProductButton = page.locator(
      'button[data-test-id^="remove-"]',
    )),
      // Order Summary
      (this.subTotal = page.locator('span[class="font-semibold"]').first()));
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

  getIncreaseButtonQtyLocator() {
    return this.increaseProductQtyButton;
  }

  async clickOnCheckOutButton() {
    await this.proceedToCheckOutButton.click();
  }

  async clickToRemoveAllProducts() {
    while ((await this.removeProductButton.count()) > 0) {
      await this.removeProductButton.first().click();
    }
  }

  getRemoveProductButton() {
    return this.removeProductButton;
  }
}
