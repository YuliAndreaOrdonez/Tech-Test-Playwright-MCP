class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.removeButtons = page.locator('[data-test^="remove-"]');
    this.cartTitle = page.locator('[data-test="title"]');
  }

  async navigate() {
    await this.page.goto('/cart.html');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async removeItem(productName) {
    const removeButton = this.page.locator(
      `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`
    );
    await removeButton.click();
  }

  async getCartItemNames() {
    const items = await this.cartItems.all();
    const names = [];

    for (const item of items) {
      const nameElement = await item.locator('[data-test="inventory_item_name"]').textContent();
      if (nameElement) {
        names.push(nameElement.trim());
      }
    }

    return names;
  }

  async getCartItemPrices() {
    const items = await this.cartItems.all();
    const prices = [];

    for (const item of items) {
      const priceElement = await item.locator('[data-test="inventory_item_price"]').textContent();
      if (priceElement) {
        prices.push(parseFloat(priceElement.replace('$', '')));
      }
    }

    return prices;
  }

  async getCartDetails() {
    const names = await this.getCartItemNames();
    const prices = await this.getCartItemPrices();

    return names.map((name, index) => ({
      name: name,
      price: prices[index] || 0,
    }));
  }

  async getCartTitle() {
    return await this.cartTitle.textContent();
  }
}

module.exports = { CartPage };
