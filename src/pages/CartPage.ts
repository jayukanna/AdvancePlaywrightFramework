import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // The page uses data-test (not data-testid), so use a CSS attribute selector.
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async clickCart() {
    await this.cartLink.click();
  }
}
