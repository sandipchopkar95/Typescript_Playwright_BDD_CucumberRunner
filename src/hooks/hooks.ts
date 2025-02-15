import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { fixture } from "./fixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../utils/logger";
import fs from "fs-extra";
import { deleteSession, loginWithSessionStorage } from "../helper/userSession/sessionStorage";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  const scenarioTags = pickle.tags.map(tag => tag.name);

  context = await browser.newContext({
    recordVideo: { dir: "test-result/videos" }
  });

  // ✅ If scenario is NOT login-related, use existing session if available
  if (!scenarioTags.includes("@login")) {
    context = await loginWithSessionStorage(browser, context);
  }else{
    console.log("❌ Not using session : Login test");
  }

  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle }) {
  const screenshotPath = `./test-result/screenshots/${pickle.name}.png`;
  const img = await fixture.page.screenshot({ path: screenshotPath, type: "png" });
  this.attach(img, "image/png");

  const videoPath = await fixture.page.video()?.path();
  await fixture.page.close();
  await context.close();

  if (videoPath) {
    this.attach(fs.readFileSync(videoPath), "video/webm");
  } else {
    console.log("No video found for this test.");
  }
});

AfterAll(async function () {
  await deleteSession();
  await browser.close();
});
