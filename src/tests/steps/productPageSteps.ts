import { Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/fixture';
import ProductPage from '../../pages/productPage';

setDefaultTimeout(60000);

let productPage: ProductPage;

// Initialize product page before tests
Given('user should see the items in the list {string}', async function (expectedItem: string) {
    productPage = new ProductPage(fixture.page);
    const itemList = await productPage.getAllProductNames();
    expect(itemList).toContain(expectedItem);
    fixture.logger.info(`Product list contains expected product: ${expectedItem}`);
});

// Check search list
Then('The search list contains {string}', async function (expectedData: string) {
    productPage = new ProductPage(fixture.page);
    await fixture.page.waitForTimeout(2000);
    const searchResult = await fixture.page.locator('.oxd-main-menu-item span').allTextContents();
    // Use .some() to check if at least one element contains expectedData
    const containsExpected = searchResult.some((value: string) => value.includes(expectedData));
    expect(containsExpected).toBeTruthy();

    fixture.logger.info(`Search list contains: ${expectedData}`);
});

Given('User should be on product page', async function () {
    productPage = new ProductPage(fixture.page);
    await productPage.navigateToProductPage();
 });
