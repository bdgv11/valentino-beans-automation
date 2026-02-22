# valentino-beans-automation
Professional E2E Automation Framework for Valentino's Magic Beans using Playwright and TypeScript. This repository implements Page Object Model (POM), API testing, and Hybrid scenarios, featuring a CI/CD pipeline with GitHub Actions for automated regression suites and HTML reporting.

## Progress Tracker: Automation Test Cases

### Phase 1: UI Base (Page Object Model)
- [x] **TC-01: Successful Purchase Flow (Guest)** - From Home to Order Confirmation.
- [x] **TC-02: Dynamic Cart Updates** - Add multiple products and verify the cart drawer reflects the correct count and items.
- [x] **TC-03: Product Detail Consistency** - Verify Name and Price match between the list and the detail page.

### Phase 2: Cart & Checkout Logic
- [x] **TC-04: Cart Totals Calculation** - Add multiple units and verify: Price × Quantity = Total.
- [x] **TC-05: Remove from Cart** - Remove an item and verify the cart badge updates to 0.
- [x] **TC-06: Checkout Form Validation** - Attempt to pay with empty fields and verify error messages.

### Phase 3: API Testing (Backend)
- [ ] **TC-07: Get All Products (GET)** - Validate 200 OK status and full product list.
- [ ] **TC-08: Product Schema Validation** - Ensure JSON objects contain `id`, `name`, `price`, and `image`.
- [ ] **TC-09: Product Not Found (404)** - Consult an invalid ID and verify the 404 error response.

### Phase 4: Hybrid & Integration
- [ ] **TC-10: API-UI Data Sync** - Compare that the price from the API matches the price displayed in the UI.
- [ ] **TC-11: UI Search vs API Match** - Search for a term in the UI and validate results against API response.

### Phase 5: DevOps & CI/CD
- [ ] **TC-12: Cross-Browser Execution** - Configure Chromium, Firefox, and Webkit in `playwright.config.ts`.
- [ ] **TC-13: GitHub Actions Pipeline** - Automated test execution on every `push` to main.
- [ ] **TC-14: HTML Report Artifacts** - Auto-save Playwright reports on CI failure.