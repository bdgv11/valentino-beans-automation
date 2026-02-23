import { test, expect } from "@playwright/test";

test.describe("Products API tests", () => {
  test("Get All Products - Status 200 & List validation", async ({
    request,
  }) => {
    // Make the HTTP request
    const response = await request.get("/products");

    // Check the status code 200
    expect(response.status()).toBe(200);

    // Convert to JSON
    const products = await response.json();

    // Validate is an array and has data
    expect(Array.isArray(products.data)).toBe(true);
    expect(products.data.length).toBeGreaterThan(0);
  });

  test("Product schema validation for all products", async ({ request }) => {
    // HTTP Request
    const response = await request.get("/products");

    // Check the status code 200
    expect(response.status()).toBe(200);

    //Convert to JSON
    const products = await response.json();

    // Using toMatchObject to validate the structure
    for (const product of products.data) {
      expect(product).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
        image: expect.any(String),
        stock: expect.any(Number),
      });
    }
  });

  test("Consult an invalid ID and verify 404 error response and message", async ({
    request,
  }) => {
    // Make HTTP request
    const id = 999;
    const response = await request.get(`/products/${id}`);

    // Validate 404 error msg
    expect(response.status()).toBe(404);

    // Convert to JSON object
    const responseBody = await response.json();
    expect(responseBody.success).toBe(false);

    // Validate message error within data is displayed
    expect(responseBody.data.message).toBe(`Product with ID ${id} not found.`);
  });
});
