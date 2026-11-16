import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {AddCartPage} from '../../pages/AddCartPage';
import {CartPage} from '../../pages/CartPage';


test.describe('to test valid login and invalid login', () => {
    let loginPage: LoginPage;

    // Opening login page before each test
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // testing for valid and invalid login

    test('should login with valid credentials', async () => {
        await loginPage.LoginWithUserNameandPassword('standard_user', 'tta_secret');
        await expect(loginPage.page).toHaveURL('https://app.thetestingacademy.com/playwright/ttacart/inventory');
    });

    test.skip('should not login with invalid credentials', async () => {
        await loginPage.LoginWithUserNameandPassword('invalid_user', 'invalid_password');
await expect(loginPage.page.locator('.login-error')).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

    // Adding a product to the cart and verifying the cart badge count

    test('should add the red t-shirt to the cart', async ({page}) => {
        const addCartPage = new AddCartPage(page);

        await loginPage.LoginWithUserNameandPassword('standard_user', 'tta_secret');
        await addCartPage.addRedTShirtToCart();
        await expect(addCartPage.cartBadge).toHaveText('1');
          
    });

    // Clicking on the cart link and verifying the cart page URL

    test('should navigate to the cart page when clicking on the cart link', async ({page}) => {
        const addCartPage = new AddCartPage(page);
        const cartPage = new CartPage(page);

        await loginPage.LoginWithUserNameandPassword('standard_user', 'tta_secret');
        await addCartPage.addRedTShirtToCart();
        await cartPage.clickCart();
        await expect(addCartPage.page).toHaveURL('https://app.thetestingacademy.com/playwright/ttacart/cart');
    });


          




});