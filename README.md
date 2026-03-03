# 🫘 Valentino's Magic Beans - E2E Automation Framework

![Playwright Tests](https://github.com/bdgv11/valentino-beans-automation/actions/workflows/playwright.yml/badge.svg)

* **Page Object Model (POM):** Scalable and maintainable architecture for UI interactions.
* **Hybrid API/UI Testing:** Specialized scenarios to ensure data integrity between backend and frontend.
* **CI/CD Integration:** Fully automated pipeline with GitHub Actions.
* **Environment Agnostic:** Flexible execution via `.env` files and secure GitHub Secrets.

---
## 🛠️ Installation & Execution

1.  **Clone the repository & install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup:**
    Create a `.env` file in the root directory (refer to `.env.example`):
    ```env
    BASE_URL=[https://valentinos-magic-beans.click](https://valentinos-magic-beans.click)
    API_URL=[https://api.valentinos-magic-beans.click](https://api.valentinos-magic-beans.click)
    ```
3.  **Run all tests:**
    ```bash
    npx playwright test
    ```
4.  **Open HTML Report:**
    ```bash
    npx playwright show-report
    ```

---
## 📈 Progress Tracker: Automation Test Cases

### Phase 1: UI Base (Page Object Model)
- [x] **TC-01: Successful Purchase Flow (Guest)** - From Home to Order Confirmation.
- [x] **TC-02: Dynamic Cart Updates** - Add multiple products and verify the cart drawer reflects the correct count and items.
- [x] **TC-03: Product Detail Consistency** - Verify Name and Price match between the list and the detail page.
- [ ] **TC-04: Auth Storage State** - Global setup to reuse authentication session across the suite.

### Phase 2: Cart & Checkout Logic
- [x] **TC-05: Cart Totals Calculation** - Add multiple units and verify: Price × Quantity = Total.
- [x] **TC-06: Remove from Cart** - Remove an item and verify the cart badge updates to 0.
- [x] **TC-07: Checkout Form Validation** - Attempt to pay with empty fields and verify error messages.

### Phase 3: API Testing (Backend)
- [x] **TC-08: Get All Products (GET)** - Validate 200 OK status and full product list.
- [x] **TC-09: Product Schema Validation** - Ensure JSON objects contain `id`, `name`, `price`, `image` and `stock`.
- [x] **TC-10: Product Not Found (404)** - Consult an invalid ID and verify the 404 error response.

### Phase 4: Hybrid & Integration
- [x] **TC-11: API-UI Data Sync** - Compare that the price from the API matches the price displayed in the UI.
- [ ] **TC-12: E2E Order Integrity** - Complete a UI purchase and verify the order's existence and data accuracy via the `/orders` API endpoint.

### Phase 5: DevOps & CI/CD
- [x] **TC-13: Cross-Browser Execution** - Configured for Chromium, Firefox, and Webkit.
- [x] **TC-14: GitHub Actions Pipeline** - Automated CI trigger on `push` and `pull_request`.
- [x] **TC-15: HTML Report Artifacts** - Automated report generation and retention on CI.

---

## 🏗️ Architecture Highlights
* **Secure Secrets Management:** Use of GitHub Secrets to handle `BASE_URL` and `API_URL` without exposing them in the codebase.
* **Web-First Assertions:** Leveraging Playwright's auto-retrying assertions for stable, non-flaky tests.
* **Dynamic Scoping:** Efficient element selection using `.filter()` and relative locators in POM.