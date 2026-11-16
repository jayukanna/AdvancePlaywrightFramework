import {Page,Locator} from '@playwright/test';

export class LoginPage{

    readonly page:Page;
    readonly userName:Locator;
    readonly password:Locator;
    readonly loginButton:Locator;

    constructor(page:Page){ 
        this.page = page;
        this.userName = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });

    };

    async goto(){
      await this.page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
    };


    async LoginWithUserNameandPassword(username:string,password:string){    

   await     this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    };


};