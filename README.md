
# Playwright BDD Project

## Description

This repository contains end-to-end (E2E) tests using **Playwright**, **Cucumber**, and **TypeScript**. It follows the Behavior-Driven Development (BDD) approach using Gherkin syntax for writing human-readable test cases.

---

## Features

- BDD-style E2E tests with Cucumber
- TypeScript support
- Playwright for fast, reliable browser automation
- Gherkin for writing human-readable scenarios
- Screenshots and traces on failure
- HTML reports for result analysis

---

## 📁 Project Structure

```
project-root/
.github/workflows/
  └── main.yml               # GitHub Actions workflow

config/
  └── cucumber.js            # Cucumber configuration

src/
  ├── helper/                # Browser and utility helpers
  ├── browsers/              # Browser settings
  ├── env/                   # Environment configurations
  ├── types/                 # Global types and interfaces
  ├── userSession/           # Session management logic
  ├── hooks/                 # Cucumber hooks
  ├── pages/                 # Page Object Models
  ├── reporter/              # Reporters (custom HTML, etc.)
  ├── tests/                 # Test setup and support files
  ├── features/              # .feature files
  ├── steps/                 # Step definition files
  ├── utils/                 # Reusable utility functions
  └── wrapper/
      └── playwrightWrappers.ts

.gitignore
@rerun.txt
README.md
cucumber
package.json
package-lock.json
tsconfig.json

```

---

## Installation

**Clone the repo**

```bash
git clone https://github.com/sandipchopkar95/playwright_BDD.git
cd playwright_BDD
```

**Install dependencies**

```bash
npm install
```

---

## Running Tests

**Run all tests**

```bash
npx cucumber-js
```

**Run specific feature**

```bash
npx cucumber-js features/path/to/your.feature
```

**Run with tags**

```bash
npx cucumber-js --tags "@smoke"
```

---

## Writing Tests

**Feature File (`.feature`)**

```gherkin
Feature: Login
  Scenario: Valid user logs in
    Given the user navigates to the login page
    When the user enters valid credentials
    Then the user should see the dashboard
```

**Step Definitions (`.ts`)**

```ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user navigates to the login page', async function () {
  await this.page.goto('https://example.com/login');
});

When('the user enters valid credentials', async function () {
  await this.page.fill('#username', 'user');
  await this.page.fill('#password', 'pass');
  await this.page.click('#submit');
});

Then('the user should see the dashboard', async function () {
  await expect(this.page.locator('#dashboard')).toBeVisible();
});
```

**`cucumber.ts` Example**

```ts
import { runCucumber } from '@cucumber/cucumber/api';

runCucumber('features/**/*.feature', {
  require: ['src/tests/**/*.ts'],
  parallel: 2,
  format: ['html:test-results/cucumber-report.html', 'summary'],
});
```

---

## Useful Scripts

**Run tests**

```bash
npm test
```

**Lint code**

```bash
npm run lint
```

**Compile TypeScript**

```bash
npm run build
```

**Clean compiled files**

```bash
npm run clean
```

---

## Reports

Test results including screenshots and HTML reports can be found in the `test-results/` folder.

**To open Playwright HTML report:**

```bash
npx playwright show-report
```

---

## CI/CD with GitHub Actions

This project includes a GitHub Actions workflow to automatically run tests on push, pull requests, and manual dispatch and deploy result to accessible url

---
