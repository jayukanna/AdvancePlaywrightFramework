import { type Locator, type Page } from '@playwright/test';

export class Checkoutpagecheckoutbackhome {
  readonly page: Page;
  readonly backToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
     this.backToProducts = page.getByTestId("back-to-products").or(page.getByRole("link", { name: "Back Home" })).or(page.getByText("Back Home"));
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/cart");
  }
  async clickBackToProducts() {
    await this.backToProducts.click();
  }
}
