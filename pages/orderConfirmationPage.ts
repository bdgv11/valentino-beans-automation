import { Page, Locator } from "@playwright/test";

export class OrderConfirmationPage {
  readonly page: Page;
  readonly orderConfirmedTitle: Locator;
  readonly orderId: Locator;
  readonly emailConfirmation: Locator;
  readonly continuShoppingButton: Locator;
  readonly trackOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderConfirmedTitle = page.getByText("Order Confirmed!");
    this.orderId = page.locator(".font-mono");
    this.emailConfirmation = page.locator(".text-sm.text-gray-500");
    this.continuShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.trackOrderButton = page.getByRole("button", {
      name: "Track Your Order",
    });
  }

  getOrderConfirmedTitle() {
    return this.orderConfirmedTitle;
  }

  async getOrderId() {
    return await this.orderId.textContent();
  }

  validateConfirmationSentToEmail() {
    return this.emailConfirmation;
  }

  async clickToTrackYourOrder() {
    await this.trackOrderButton.click();
  }
}
