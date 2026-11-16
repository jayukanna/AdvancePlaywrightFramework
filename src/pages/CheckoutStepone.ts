import { type Locator, type Page } from '@playwright/test';

export class Checkoutpageone {
  readonly page: Page;
  readonly addToCartTestAllthethings: Locator;
  readonly shoppingCartBadge: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartTestAllthethings = page.getByTestId("add-to-cart-test-allthethings-tshirt-red").or(page.getByRole("button", { name: "Add to cart" })).or(page.getByText("Add to cart"));
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge").or(page.getByText("1"));
    this.checkout = page.getByTestId("checkout").or(page.getByRole("link", { name: "Checkout" })).or(page.getByText("Checkout"));
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/cart");
  }

  async clickCheckout() {
    await this.checkout.click();
  }
}
