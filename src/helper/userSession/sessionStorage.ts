import { Browser, BrowserContext } from "@playwright/test";
import fs from "fs-extra";
import { fixture } from "../../hooks/fixture";
import LoginPage from "../../pages/loginPage";

const SESSION_FILE_PATH = "src/helper/userSession/sessions/storageState.json";

export async function loginWithSessionStorage(browser: Browser, context: BrowserContext): Promise<BrowserContext> {
  try {
    // Ensure session folder exists
    await fs.ensureDir("src/helper/userSession/sessions");

    // ✅ If session exists, use it directly
    if (await fs.pathExists(SESSION_FILE_PATH)) {
      console.log("✅ Using existing session storage.");
      return await browser.newContext({
        storageState: SESSION_FILE_PATH,
        recordVideo: { dir: "test-result/videos" }
      });
    }

    console.log("🔹 No session found. Creating a new session...");
    const page = await browser.newPage();
    fixture.page = page;

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    fixture.logger.info("User navigated to the login page");

    await loginPage.enterUsername("standard_user");
    fixture.logger.info("User entered username");

    await loginPage.enterPassword("secret_sauce");
    fixture.logger.info("User entered password");

    await loginPage.clickLoginButton();
    fixture.logger.info("User clicked login button");

    // ✅ Save session storage
    await context.storageState({ path: SESSION_FILE_PATH });
    console.log("✅ Session stored at:", SESSION_FILE_PATH);

    // Close old context and create new one with saved session
    await context.close();
    return await browser.newContext({
      storageState: SESSION_FILE_PATH,
      recordVideo: { dir: "test-result/videos" }
    });
  } catch (error) {
    console.error("❌ Error handling session:", error);
    return context;
  }
}

// ✅ Deletes session file after all tests
export async function deleteSession() {
  try {
    if (await fs.pathExists(SESSION_FILE_PATH)) {
      await fs.unlink(SESSION_FILE_PATH);
      console.log("🗑️  Deleted session file:", SESSION_FILE_PATH);
    }
  } catch (error) {
    console.error("❌ Error while deleting session:", error);
  }
}
