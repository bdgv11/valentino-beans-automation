import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly addressField: Locator;
  readonly citiField: Locator;
  readonly zipCodeField: Locator;
  readonly countryField: Locator;
  readonly nameOnCardField: Locator;
  readonly cardNumberField: Locator;
  readonly expireCardDateField: Locator;
  readonly cvcCardField: Locator;
  readonly placeOrderButton: Locator;
  readonly errorMsgs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByLabel("First Name");
    this.lastNameField = page.getByLabel("Last Name");
    this.emailField = page.getByLabel("Email");
    this.addressField = page.getByLabel("Address");
    this.citiField = page.getByLabel("City");
    this.zipCodeField = page.getByLabel("ZIP Code");
    this.countryField = page.getByLabel("Country");
    this.nameOnCardField = page.getByLabel("Name on Card");
    this.cardNumberField = page.getByLabel("Card Number");
    this.expireCardDateField = page.getByLabel("Expiry (MM/YY)");
    this.cvcCardField = page.getByLabel("CVC");
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
    this.errorMsgs = page.locator(".text-destructive");
  }

  async clearAllFormFields() {
    await this.firstNameField.clear();
    await this.lastNameField.clear();
    await this.emailField.clear();
    await this.addressField.clear();
    await this.citiField.clear();
    await this.zipCodeField.clear();
    await this.countryField.clear();
    await this.nameOnCardField.clear();
    await this.cardNumberField.clear();
    await this.expireCardDateField.clear();
    await this.cvcCardField.clear();
  }

  async fillCheckoutForm(data: any) {
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.fill(data.lastName);
    await this.emailField.fill(data.email);
    await this.addressField.fill(data.address);
    await this.citiField.fill(data.city);
    await this.zipCodeField.fill(data.zipCode);
    await this.countryField.fill(data.country);
    await this.nameOnCardField.fill(data.firstName + " " + data.lastName);
    await this.cardNumberField.fill(data.cardNumber);
    await this.expireCardDateField.fill(data.expireDate);
    await this.cvcCardField.fill(data.cvcCard);
  }

  async clickToPlaceOrder() {
    await this.placeOrderButton.click();
  }

  getErrorMsgLocator() {
    return this.errorMsgs;
  }
}
