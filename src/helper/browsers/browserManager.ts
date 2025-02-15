import { chromium, firefox, webkit, Browser, LaunchOptions } from "@playwright/test";

const options: LaunchOptions = {
    headless: process.env.HEADLESS === "true", // Dynamically set based on env
};

export const invokeBrowser = (): Promise<Browser> => {
    const browserType = process.env.BROWSER as "chrome" | "firefox" | "webkit" | undefined;

    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            return chromium.launch(options); 
    }
};

// export const invokeBrowser = (browserType: 'chrome' | 'firefox' | 'webkit'): Promise<Browser> => {
//     switch (browserType) {
//         case 'chrome':
//             return chromium.launch(options);
//         case 'firefox':
//             return firefox.launch(options);
//         case 'webkit':
//             return webkit.launch(options);
//         default:
//             return chromium.launch(options);
//     }
// };
