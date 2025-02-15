import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/fixture';

setDefaultTimeout(60000);
// fill search data
Given('user should see the items in the list {string}', async function (expectedItem:string) {
   await fixture.page.waitForTimeout(2000);
   const itemList=await fixture.page.locator('.inventory_item_name').allTextContents();
   expect(itemList).toContain(expectedItem);
   fixture.logger.info(`product contains expected product ${expectedItem}`);
});

//check search list
Then('The search list contains {string}',async function name(expecteData:string) {
    await fixture.page.waitForTimeout(2000);
    const searchResult = await fixture.page.locator('.oxd-main-menu-item span').allTextContents();
    searchResult.filter((value:string)=>{
        expect(value).toContain(expecteData);
    })
});