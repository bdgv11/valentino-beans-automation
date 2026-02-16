import { expect, type Locator, type Page } from "@playwright/test";

export class HeaderPage {
  readonly page: Page;
  readonly shopProductLink: Locator;
  readonly contactAndTrackLink: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly cartButton: Locator;
  readonly cartBadgeNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopProductLink = page.getByRole("link", {
      name: "Shop",
      exact: true,
    });
    this.contactAndTrackLink = page.getByRole("link", { name: "Contact" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.signUpButton = page.getByRole("button", { name: "Sign Up" });
    this.cartButton = page
      .locator('[data-test-id="header-cart-button"]')
      .getByRole("button");
    this.cartBadgeNumber = page.locator('span[class="bg-red-500"]');
  }

  async validateHeaderPageLoads() {
    expect(this.shopProductLink).toBeVisible();
    expect(this.contactAndTrackLink).toBeVisible();
    expect(this.cartButton).toBeVisible();
  }

  async goToShopProduct() {
    await this.shopProductLink.click();
  }

  async goToContactAndTrackPage() {
    await this.contactAndTrackLink.click();
  }

  async goToLogInPage() {
    await this.loginButton.click();
  }

  async goToSignUpPage() {
    await this.signUpButton.click();
  }

  async clickOnCartButton() {
    await this.cartButton.click();
  }

  getBadgeNumber() {
    return this.cartButton;
  }
}
