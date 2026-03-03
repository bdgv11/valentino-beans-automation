import { test, expect } from '@playwright/test'
import { HeaderPage } from '../../pages/headerPage'
import { ShopPage } from '../../pages/shopPage'

let headerPage: HeaderPage
let shopPage: ShopPage

test.beforeEach(async ({ page }) => {
  await page.goto('')
  headerPage = new HeaderPage(page)
  shopPage = new ShopPage(page)
})
test('Data Synchronization: API vs UI', async ({ request, page }) => {
  // Make the HTTP request
  const response = await request.get(`${process.env.API_URL}/products`)

  // Check the status code 200
  expect(response.status()).toBe(200)

  // Convert to JSON
  const products = await response.json()

  // Validate is an array and has data
  expect(Array.isArray(products.data)).toBe(true)
  expect(products.data.length).toBeGreaterThan(0)

  // Go to shop page
  await headerPage.goToShopProduct()

  for (const prod of products.data) {
    await expect(shopPage.getProductCardByName(prod.name)).toHaveText(`$${prod.price}`)
  }
})
