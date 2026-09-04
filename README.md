# Playwright Automation Assignment

Playwright + TypeScript automation framework for the Shofy Admin demo application. The suite covers authentication, dashboard validation, product CRUD, validation, test-data management, fixtures, parallel execution, and debugging artifacts.

Repository: [LongNH132_Playwright_Assignment](https://github.com/nguyenlong0920/LongNH132_Playwright_Assignment)

## Scope

- Login: valid login, invalid credentials, required-field validation, and logout
- Dashboard: dashboard, left navigation, and profile/header validation
- Product management: create, search, update, delete, and form validation
- Framework practices: Page Object Model, Component Object Model, fixture injection, dynamic data, tags, parallel execution, and reporting

## Prerequisites

- Node.js 18 or later
- npm

## Setup

```bash
npm install
npx playwright install
```

Create or update the environment file used for the target environment:

```env
BASE_URL=http://shofy.botble.com
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
```

The default environment is `.env.dev`. To run with another environment file, pass `ENV_FILE`:

```bash
ENV_FILE=.env.qa npx playwright test
```

## Run tests

```bash
# All tests, across configured browsers
npx playwright test

# Test groups
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @crud
npx playwright test --grep @negative
npx playwright test --grep @parallel

# Run with all logger levels, including DEBUG
npm run test:logs

# Run the separate Cucumber BDD scenario for TC-17
npm run test:bdd

# Run independent Cucumber scenarios with two workers
npm run test:bdd:parallel

# Run a single browser or spec file
npx playwright test --project=chromium
npx playwright test tests/product-crud.spec.ts

# Collect a trace for local investigation
npx playwright test --trace on
```

## Reports and debugging

```bash
# Open the HTML report after a run
npx playwright show-report

# Open a Playwright trace file
npx playwright show-trace path/to/trace.zip
```

The Playwright configuration generates an HTML report and retains traces, screenshots, and videos when a test fails. These artifacts help inspect the exact UI state and execution flow of a failed scenario.

## Framework structure

```text
components/       Reusable UI parts: Header, LeftMenu, Notification
data/
  factories/      Dynamic product data generation
  static/         Reusable static application data
fixtures/         Playwright fixture injection for page objects and components
pages/            Page Object Model classes and page-specific actions
tests/            Test specifications grouped by feature and framework topic
utils/            Environment and waiting helpers
playwright.config.ts
```

## Framework design

### Page Object Model

Page classes keep page-specific locators, actions, and assertions out of spec files. Tests describe the business scenario using `LoginPage`, `DashboardPage`, `ProductPage`, and `CreateProductPage` methods.

### Component Object Model

Shared interface areas are modeled once in `components/`: the left menu, header/profile menu, and notification toast. This avoids duplicating shared locators across page objects and tests.

### Fixture injection

`fixtures/pageFixtures.ts` uses `test.extend()` to instantiate and inject page objects/components. Tests receive dependencies such as `loginPage`, `productPage`, and `notification` directly in their callback arguments rather than constructing them manually.

### Test-data strategy

`ProductFactory` generates a UUID-based name and SKU for each product. This prevents collisions with existing public-demo data and makes product tests safer to run repeatedly or in parallel. Tests should only act on the product created within the same test run.

### Parallel execution

`fullyParallel: true` and multiple workers are enabled in `playwright.config.ts`. Each product scenario creates unique data, so it does not share a product record with another scenario. The public demo can still be slower or less stable under high concurrency.

## Locator strategy

Locators follow this preference order:

1. A unique, stable `id` whenever the application exposes one, for example `page.locator('#username')` or `page.locator('#name-error')`. IDs are direct, readable, and less affected by layout changes.
2. A role locator for interactive or accessible UI elements without a suitable ID, for example `page.getByRole('button', { name: 'Create', exact: true })`. Role locators describe the user-facing control and make tests more readable.
3. A focused CSS selector only when neither an ID nor a role locator is reliable. CSS selectors are scoped to a stable parent where practical, for example the product table or a form section.

Before adopting a locator, it is checked in browser DevTools to ensure that it resolves to exactly one intended DOM element. Assertions and actions therefore do not accidentally target the first matching element. XPath is not used. Locators are kept in page and component classes so a UI change has one place to update.

## Known limitations

- Shofy is a public demo environment, so data and UI responsiveness can be affected by other users.
- Product tests use generated records to avoid conflicting with existing demo data.
- Browser projects run against the same shared demo environment; transient demo-environment issues can affect parallel execution.
