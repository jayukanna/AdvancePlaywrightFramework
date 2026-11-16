import { type Locator, type Page } from '@playwright/test';

export class AddCartPage {
  readonly page: Page;
  readonly addToCartTestAllthethings: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // The page uses data-test (not data-testid), so getByTestId() can't find it. Use a CSS attribute selector instead.
    this.addToCartTestAllthethings = page.locator('[data-test="add-to-cart-test-allthethings-tshirt-red"]');
    this.cartBadge = page.locator('.cart-badge');
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
  }

  async addRedTShirtToCart() {
    await this.addToCartTestAllthethings.click();
  }
}
