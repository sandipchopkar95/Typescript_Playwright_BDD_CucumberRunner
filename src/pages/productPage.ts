import { Page } from "@playwright/test";
import PlaywrightWrapper from "../wrapper/playwrightWrappers";

export default class ProductPage{
    private base : PlaywrightWrapper;

    constructor(private page:Page){
        this.base=new PlaywrightWrapper(page);
    }

    private Elements={
        title_Page:'div.product_label',
        item_Names:'div.inventory_item_name',
    }

    async getProductPageTitle():Promise<string >{
        return await this.base.waitAndGetText(this.Elements.title_Page);
    }

    async getAllProductNames():Promise<string[]>{
       return await this.base.waitAndGetAllTexts(this.Elements.item_Names);
    }

   
}