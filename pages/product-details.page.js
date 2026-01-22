class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.productImage = page.locator('[data-test="inventory-item-img"]');
  }

  async navigate() {
    await this.page.goto('/inventory-item.html');
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  async getProductPrice() {
    const priceText = await this.productPrice.textContent();
    return parseFloat(priceText.replace('$', ''));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async getProductDetails() {
    return {
      name: await this.getProductName(),
      description: await this.getProductDescription(),
      price: await this.getProductPrice(),
    };
  }
}

module.exports = { ProductDetailsPage };
