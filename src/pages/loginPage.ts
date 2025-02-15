import { Page } from "@playwright/test";
import PlaywrightWrapper from "../wrapper/playwrightWrappers";


export default class LoginPage{

    private base:PlaywrightWrapper;

    constructor(private page:Page){
        this.base=new PlaywrightWrapper(page);
    }

    private Elements={
        textField_username : '#user-name',
        textField_password : '#password',
        button_LogIn:'#login-button',
        login_error:'h3[data-test="error"]'
    }

    async navigateToLoginPage(){
       await this.base.goto(process.env.BASEURL);
    }

    async enterUsername(username:string){
        await this.base.waitAndFill(this.Elements.textField_username,username);
    }

    async enterPassword(password:string){
        await this.base.waitAndFill(this.Elements.textField_password,password);
    }

    async clickLoginButton(){
        await this.base.waitAndClick(this.Elements.button_LogIn);
        await this.base.waitTillLoad();
    }

    async getInvaldCredentialError(){
        return await this.base.waitAndGetText(this.Elements.login_error);
    }

}