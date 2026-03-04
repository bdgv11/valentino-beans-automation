import { test, expect } from '@playwright/test'
import { HeaderPage } from '../../pages/headerPage'
import { ShopPage } from '../../pages/shopPage'
import { CartPage } from '../../pages/cartPage'
import { CheckoutPage } from '../../pages/checkoutPage'
import { ContactAndTrackOrderPage } from '../../pages/contactAndTrackOrderPage'
import { OrderConfirmationPage } from '../../pages/orderConfirmationPage'
import { OrderDetailsPage } from '../../pages/orderDetailsPage'
import { RandomCheckoutData } from '../../utils/checkout.data'

let headerPage: HeaderPage
let shopPage: ShopPage
let cartPage: CartPage
let checkoutPage: CheckoutPage
let orderConfirmationPage: OrderConfirmationPage
let trackOrderPage: ContactAndTrackOrderPage
let orderDetailsPage: OrderDetailsPage

test.beforeEach(async ({ page }) => {
  await page.goto('')
  headerPage = new HeaderPage(page)
  shopPage = new ShopPage(page)
  cartPage = new CartPage(page)
  checkoutPage = new CheckoutPage(page)
  orderConfirmationPage = new OrderConfirmationPage(page)
  trackOrderPage = new ContactAndTrackOrderPage(page)
  orderDetailsPage = new OrderDetailsPage(page)
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

test('Data Sync - verify UI purchase matches API order data', async ({ page, request }) => {
  // Go to shop page
  await headerPage.goToShopProduct()

  const prodIndex = 3
  const prodName = await shopPage.getProductNameByIndex(prodIndex).textContent()
  const prodPrice = await shopPage.getProductPriceByIndex(prodIndex).textContent()
  const prodQuantity = '1'

  // Select a product by index
  await shopPage.addProductByIndex(prodIndex)

  // Assert successful msg displayed
  await shopPage.validateMsgProductAdded(prodName!)

  // Click to cart button
  await headerPage.clickOnCartButton()

  // Assert name, price and quantity
  await expect(cartPage.getProductNameLocator()).toHaveText(prodName!)
  await expect(cartPage.getProductPriceLocator()).toContainText(prodPrice!)
  await expect(cartPage.getProductQuantityLocator()).toHaveText(prodQuantity)
  await expect(cartPage.getSubtotalLocator()).toContainText(prodPrice!)

  // Click on proceed to checkout button
  await cartPage.clickOnCheckOutButton()

  // Fill all the checkout form
  await checkoutPage.clearAllFormFields()
  const checkoutData = RandomCheckoutData.generateCheckoutData()
  await checkoutPage.fillCheckoutForm(checkoutData)

  // Click on Place Order
  await checkoutPage.clickToPlaceOrder()

  // No error msgs are displayed
  await expect(checkoutPage.getErrorMsgLocator()).not.toBeVisible()

  // Order Confirmation page
  // Validate order is confirmed & email is correct
  await expect(orderConfirmationPage.getOrderConfirmedTitle()).toBeVisible()
  const orderId = await orderConfirmationPage.getOrderId()
  expect(orderId).toBeTruthy()
  await expect(orderConfirmationPage.validateConfirmationSentToEmail()).toContainText(
    checkoutData.email,
  )

  // Go to Track Order page
  await orderConfirmationPage.clickToTrackYourOrder()

  // Fill the form to track order
  await trackOrderPage.typeOrderId(orderId!)
  await trackOrderPage.typeEmail(checkoutData.email)
  await trackOrderPage.clickOnTrackorder()

  // API section of the test
  // Payload to use
  const payload = {
    orderId: orderId,
    email: checkoutData.email,
  }

  // Make HTTP request with payload
  const response = await request.post(`${process.env.API_URL}/orders/lookup`, { data: payload })
  expect(response.status()).toBe(200)

  // Convert to JSON
  const product = await response.json()

  // On Order Details page validate product name, quantity, client name and email displayed
  await expect(orderDetailsPage.getProductNameLocator(prodName!)).toContainText(
    product.data.items[0].productName,
  )
  await expect(orderDetailsPage.getProductQuantity()).toContainText(
    product.data.items[0].quantity.toString(),
  )
  await expect(orderDetailsPage.getProductPrice(prodPrice!.replace('$', '').trim())).toContainText(
    product.data.items[0].price.toString(),
  )
  await expect(
    orderDetailsPage.getCustomerName(checkoutData.firstName, checkoutData.lastName),
  ).toContainText(product.data.customerName)

  await expect(orderDetailsPage.getCustomerEmail(checkoutData.email)).toContainText(
    product.data.customerEmail,
  )
})
