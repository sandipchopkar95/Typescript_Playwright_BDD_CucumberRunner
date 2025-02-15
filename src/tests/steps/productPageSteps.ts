import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

setDefaultTimeout(60000);
// fill search data
Given('user should see the items in the list {string}', async function (expectedItem:string) {
   await pageFixture.page.waitForTimeout(2000);
   const itemList=await pageFixture.page.locator('.inventory_item_name').allTextContents();
   expect(itemList).toContain(expectedItem);
});

//check search list
Then('The search list contains {string}',async function name(expecteData:string) {
    await pageFixture.page.waitForTimeout(2000);
    const searchResult = await pageFixture.page.locator('.oxd-main-menu-item span').allTextContents();
    searchResult.filter((value:string)=>{
        expect(value).toContain(expecteData);
    })
});