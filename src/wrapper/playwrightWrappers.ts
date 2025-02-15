import { Page } from "@playwright/test";


export default class PlaywrightWrapper{

    constructor(private page:Page){
        
    }

    async goto(url:string){
        await this.page.goto(url,{
            'waitUntil':'domcontentloaded'
        });
    }

    async waitAndClick(selector:string){
        const element = await this.page.locator(selector);
        element.waitFor({
         state :'visible'
        });
        await element.click();
    }

    async waitAndFill(selector:string,inputText:string){
        const element = await this.page.locator(selector);
        element.waitFor({
            state:'visible'
        });
        await element.fill(inputText);
    }

    async waitAndGetText(selector:string):Promise<string>{
        const element  = await this.page.locator(selector);
        element.waitFor({
            state:'visible'
        });
        return (await element.textContent()).trim();
    }

    async waitAndGetAllTexts(selector: string): Promise<string[]> {
        await this.page.locator(selector).first().waitFor({ state: 'visible' });
        const element = this.page.locator(selector);
        const allTexts = await element.allTextContents();
        return allTexts.map(text => text.trim());
    }
    
    async waitTillLoad(){
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForTimeout(timeout:number){
        await this.page.waitForTimeout(timeout);
    }

}