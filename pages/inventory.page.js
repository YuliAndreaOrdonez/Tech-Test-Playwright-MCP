class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productList = page.getByTestId('inventory-list');
    this.addToCartButtons = page.getByTestId(/^add-to-cart-/);
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.menuButton = page.getByTestId('react-burger-menu-btn');
  }

  async addProductToCart(productName) {
    const button = this.page.getByTestId(
      `add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`
    );
    await button.click();
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
