import {BeforeAll,AfterAll, Before, After} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { pageFixture } from './pageFixtures';

let browser:Browser;
let context:BrowserContext;
let page:Page;

BeforeAll(async function(){
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
       context = await browser.newContext();
       page = await context.newPage();
       pageFixture.page = page;
});

After(async function({pickle}){
    //screenshot
    const img = await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`, type:'png'});
     await this.attach(img,'image/png');
     await pageFixture.page.close();
     await context.close();
});

AfterAll(async function(){
  await browser.close();
});