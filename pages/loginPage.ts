import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.getByLabel('Email')
    this.passwordField = page.getByLabel('Password')
    this.loginButton = page.getByRole('button', { name: 'Login' }).nth(1)
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
  }
}
