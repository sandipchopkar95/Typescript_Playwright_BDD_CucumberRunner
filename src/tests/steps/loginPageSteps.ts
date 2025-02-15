import { Given, When, Then ,setDefaultTimeout} from '@cucumber/cucumber';
import { expect} from '@playwright/test';
import { fixture } from '../../hooks/fixture';

setDefaultTimeout(60000);
// Launch Browser
Given('User should be on login page', async function () {
   await fixture.page.goto(process.env.BASEURL);
   fixture.logger.info('User navigated to the login page');
});

// Fill Username
Given('User enters username as {string}', async function (username: string) {
   await fixture.page.fill('#user-name',username);
   fixture.logger.info('user entered username');
});

// Fill Password
Given('User enters password as {string}', async function (password: string) {
   await fixture.page.fill('#password',password);
   fixture.logger.info('user entered password');
});

// Click Login Button
Given('User clicks Login Button', async function () {
   await fixture.page.click('#login-button');
   fixture.logger.info('user clicked login button');
});

// Check if User is Navigated to Dashboard
Then('User should be navigate to product page {string}', async function (expected_data: string) {
   const title: string = await fixture.page.textContent('.product_label');
   expect(title).toEqual(expected_data);
   fixture.logger.info(`user is navigated to the ${expected_data}  page`);
});

// Check if Invalid Credentials Message is Displayed
Then('User should see the error message {string}', async function (expected_data: string) {
   const flag: boolean = await fixture.page.locator('h3[data-test="error"]').isVisible();
   expect(flag).toBe(expected_data);
});
