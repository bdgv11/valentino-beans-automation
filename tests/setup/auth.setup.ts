import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'
import { HeaderPage } from '../../pages/headerPage'

// Path to save json
const authFile = '.auth/user.json'

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const headerPage = new HeaderPage(page)

  // 1. Navigate to LogIn page
  await page.goto(`${process.env.BASE_URL}`)
  await headerPage.goToLogInPage()

  // 2. Login using valid credentials
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)

  // 3. Validate is already logged
  await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible()

  await page.waitForFunction(() => {
    return Object.keys(localStorage).some((key) => key.endsWith('idToken'))
  })

  const token = await page.evaluate(() => {
    const key = Object.keys(localStorage).find((k) => k.endsWith('idToken'))
    return key ? localStorage.getItem(key) : null
  })

  if (token) {
    process.env.AUTH_TOKEN = token
    console.log('🔑 API Auth Token captured successfully')
  }

  // 4. Save on json file
  await page.context().storageState({ path: authFile })
})
