import { Given, When, Then ,setDefaultTimeout} from '@cucumber/cucumber';
import { expect , } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

setDefaultTimeout(60000);
// Launch Browser
Given('User should be on login page', async function () {
   await pageFixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

// Fill Username
Given('User enters username as {string}', async function (username: string) {
   await pageFixture.page.getByPlaceholder('Username').fill(username);
});

// Fill Password
Given('User enters password as {string}', async function (password: string) {
   await pageFixture.page.getByPlaceholder('Password').fill(password);
});

// Click Login Button
Given('User clicks Login Button', async function () {
   await pageFixture.page.locator('button:text-is("Login")').click();
});

// Check if User is Navigated to Dashboard
Then('User should be navigate to dashboard page {string}', async function (expected_data: string) {
   const title: string = await pageFixture.page.locator('h6.oxd-text').textContent();
   expect(title).toEqual(expected_data);
});

// Check if Invalid Credentials Message is Displayed
Then('User should not be navigate to dashboard page {string}', async function (expected_data: string) {
   const flag: boolean = await pageFixture.page.getByText("Invalid credentials").isVisible();
   expect(flag).toBe(expected_data);
});
