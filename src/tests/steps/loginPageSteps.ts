import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/fixture';
import LoginPage from '../../pages/loginPage';
import ProductPage from '../../pages/productPage';

setDefaultTimeout(60000);

let loginPage: LoginPage;
let productPage: ProductPage;

// Launch Browser
Given('User should be on login page', async function () {
   loginPage = new LoginPage(fixture.page);
   productPage = new ProductPage(fixture.page);
   await loginPage.navigateToLoginPage();
   fixture.logger.info('User navigated to the login page');
});

// Fill Username
Given('User enters username as {string}', async function (username: string) {
   await loginPage.enterUsername(username);
   fixture.logger.info('User entered username');
});

// Fill Password
Given('User enters password as {string}', async function (password: string) {
   await loginPage.enterPassword(password);
   fixture.logger.info('User entered password');
});

// Click Login Button
Given('User clicks Login Button', async function () {
   await loginPage.clickLoginButton();
   fixture.logger.info('User clicked login button');
});

// Check if User is Navigated to Dashboard
Then('User should be navigate to product page {string}', async function (expected_data: string) {
   const title = await productPage.getProductPageTitle();
   expect(title).toEqual(expected_data);
   fixture.logger.info(`User is navigated to the ${expected_data} page`);
});

// Check if Invalid Credentials Message is Displayed
Then('User should receive an error message as {string}', async function (expected_data: string) {
   const errorMessage: string = await loginPage.getInvaldCredentialError();
   expect(errorMessage).toContain(expected_data);
   fixture.logger.info(`User received an error message: ${expected_data}`);
});

// Pre-login step
Given('User should be on product page', async function () {
   loginPage = new LoginPage(fixture.page);
   productPage = new ProductPage(fixture.page);
   await loginPage.navigateToLoginPage();
   fixture.logger.info('User navigated to the login page');
   await loginPage.enterUsername('standard_user');
   fixture.logger.info('User entered username');
   await loginPage.enterPassword('secret_sauce');
   fixture.logger.info('User entered password');
   await loginPage.clickLoginButton();
   fixture.logger.info('User clicked login button');
});
