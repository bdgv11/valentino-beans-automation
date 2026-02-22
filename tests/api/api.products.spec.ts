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
});
