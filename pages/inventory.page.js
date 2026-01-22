class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productList = page.locator('[data-test="inventory-list"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('[data-test="react-burger-menu-btn"]');
  }

  async navigate() {
    await this.page.goto('/inventory.html');
  }

  async getProductByName(productName) {
    return this.page.locator(`.inventory_item:has-text("${productName}")`);
  }

  async addProductToCart(productName) {
    const product = await this.getProductByName(productName);
    const addToCartButton = product.locator('[data-test^="add-to-cart-"]');
    await addToCartButton.click();
  }

  async getCartBadgeCount() {
    const badge = await this.cartBadge.textContent();
    return badge ? parseInt(badge) : 0;
  }

  async sortProducts(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async openMenu() {
    await this.menuButton.click();
  }
}

module.exports = { InventoryPage };
