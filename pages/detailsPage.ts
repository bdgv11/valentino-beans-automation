import { Page, Locator } from "@playwright/test";

export class DetailsPage {
  readonly page: Page;
  readonly productTitleName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitleName = page.locator(".text-4xl");
    this.productDescription = page.locator(".leading-relaxed");
    this.productPrice = page.locator(".text-3xl");
  }

  getProductTitleLocator() {
    return this.productTitleName;
  }

  getProductDescriptionLocator() {
    return this.productDescription;
  }

  getProductPriceLocator() {
    return this.productPrice;
  }
}
