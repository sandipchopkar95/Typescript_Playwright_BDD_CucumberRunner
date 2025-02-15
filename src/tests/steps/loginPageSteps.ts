import { Given, When, Then ,setDefaultTimeout} from '@cucumber/cucumber';
import { expect} from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

setDefaultTimeout(60000);
// Launch Browser
Given('User should be on login page', async function () {
   await pageFixture.page.goto(process.env.BASEURL);
});

// Fill Username
Given('User enters username as {string}', async function (username: string) {
   await pageFixture.page.fill('#user-name',username);
});

// Fill Password
Given('User enters password as {string}', async function (password: string) {
   await pageFixture.page.fill('#password',password);
});

// Click Login Button
Given('User clicks Login Button', async function () {
   await pageFixture.page.click('#login-button');
});

// Check if User is Navigated to Dashboard
Then('User should be navigate to product page {string}', async function (expected_data: string) {
   const title: string = await pageFixture.page.textContent('.product_label');
   expect(title).toEqual(expected_data);
});

// Check if Invalid Credentials Message is Displayed
Then('User should see the error message {string}', async function (expected_data: string) {
   const flag: boolean = await pageFixture.page.locator('h3[data-test="error"]').isVisible();
   expect(flag).toBe(expected_data);
});
