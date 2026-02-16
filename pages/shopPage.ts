import { expect, type Locator, type Page } from "@playwright/test";

export class ShopPage {
  readonly page: Page;
  readonly productCard: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly viewDetailsButton: Locator;
  readonly addedSuccessMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCard = page.locator(".p-6");
    this.productName = page.getByRole("heading");
    this.productDescription = page.getByRole("paragraph");
    this.productPrice = page.locator(".font-bold");
    this.addToCartButton = page.getByRole("button", {
      name: "Add to Cart",
    });
    this.viewDetailsButton = page.getByRole("button", {
      name: "View Details",
    });
    this.addedSuccessMsg = page.locator('div[class="text-sm opacity-90"]');
  }

  async addProductByName(productName: string) {
    await this.productCard
      .filter({ hasText: productName })
      .locator(this.addToCartButton)
      .click();
  }

  async addProductByIndex(index: number) {
    await this.productCard.nth(index).locator(this.addToCartButton).click();
  }

  async validateMsgProductAdded(productName: string) {
    await expect(
      this.page.getByText(productName + " is now in your cart.", {
        exact: true,
      }),
    ).toBeVisible();
  }

  getProductNameByIndex(index: number) {
    return this.productCard.nth(index).locator(this.productName);
  }

  getProductDescriptionByIndex(index: number) {
    return this.productCard.nth(index).locator(this.productDescription);
  }

  getProductPriceByIndex(index: number) {
    return this.productCard.nth(index).locator(this.productPrice);
  }

  async clickOnViewDetailsByIndex(index: number) {
    await this.productCard.nth(index).locator(this.viewDetailsButton).click();
  }
}
