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
    return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
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

  async clickProductByName(productName) {
    const product = await this.getProductByName(productName);
    const productLink = product.locator('[data-test^="item-"][data-test$="-title-link"]');
    await productLink.click();
  }

  async getAllProductNames() {
    const products = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    return products;
  }

  async getAllProductPrices() {
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async getSortOption() {
    return await this.sortDropdown.inputValue();
  }

  async getProductList() {
    return this.productList;
  }
}

module.exports = { InventoryPage };
