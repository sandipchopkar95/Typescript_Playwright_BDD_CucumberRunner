import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

setDefaultTimeout(60000);
// fill search data
Given('User enters search text in search bar {string}', async function (searchdata:string) {
   await pageFixture.page.fill('.oxd-main-menu-search input',searchdata,{timeout:3000});
});

//check search list
Then('The search list contains {string}',async function name(expecteData:string) {
    await pageFixture.page.waitForTimeout(2000);
    const searchResult = await pageFixture.page.locator('.oxd-main-menu-item span').allTextContents();
    searchResult.filter((value:string)=>{
        expect(value).toContain(expecteData);
    })
});