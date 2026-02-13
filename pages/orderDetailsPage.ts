import { Page, Locator } from "@playwright/test";

export class OrderDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("p[class='font-semibold']");
    this.productQuantity = page.locator("p[class='text-sm text-gray-600']");
  }

  getProductNameLocator(prodName: string) {
    return this.page.getByText(prodName).first();
  }

  getProductQuantity() {
    return this.productQuantity;
  }

  getProductPrice(price: string) {
    return this.page.getByText("$" + price);
  }

  getCustomerName(name: string, lastName: string) {
    return this.page.getByText(`${name} ${lastName}`);
  }

  getCustomerEmail(email: string) {
    return this.page.getByText(email);
  }
}
