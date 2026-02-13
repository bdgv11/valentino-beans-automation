import { Page, Locator } from "@playwright/test";

export class ContactAndTrackOrderPage {
  readonly page: Page;
  readonly orderIdField: Locator;
  readonly emailField: Locator;
  readonly trackOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderIdField = page.getByLabel("Order ID");
    this.emailField = page.getByLabel("Email Address");
    this.trackOrderButton = page.getByRole("button", { name: "Track Order" });
  }

  async typeOrderId(orderId: string) {
    await this.orderIdField.fill(orderId);
  }

  async typeEmail(email: string) {
    await this.emailField.fill(email);
  }

  async clickOnTrackorder() {
    await this.trackOrderButton.click();
  }
}
