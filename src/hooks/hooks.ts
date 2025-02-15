import {BeforeAll,AfterAll, Before, After} from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { fixture } from './fixture';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../utils/logger';
import fs from 'fs';

let browser:Browser;
let context:BrowserContext;
let page:Page;

BeforeAll(async function(){
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({pickle}) {
       const scenarioName=pickle.name+pickle.id;
       context = await browser.newContext({
        recordVideo:{
          dir: "test-result/videos"
        }
       });
       page = await context.newPage();
       fixture.page = page;
       fixture.logger= createLogger(options(scenarioName));
});

After(async function({pickle}){
    //screenshot
    const img = await fixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`, type:'png'}); 
      this.attach(img,'image/png');
     const videoPath = await fixture.page.video()?.path();
     await fixture.page.close();
     await context.close();
     if (videoPath) {
      this.attach(fs.readFileSync(videoPath), 'video/webm');
    } else {
      console.log("No video found for this test.");
    }
});

AfterAll(async function(){
  await browser.close();
  // fixture.logger.close();
});