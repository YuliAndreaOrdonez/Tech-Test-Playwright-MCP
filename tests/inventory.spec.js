const { test, expect } = require('@playwright/test');
const { loginUser } = require('../flows/login.flow');
const {
  sortProductsFlow,
  viewProductDetailsFlow,
  browseInventoryFlow,
} = require('../flows/product-management.flow');
const { InventoryPage, ProductDetailsPage } = require('../pages');
const { validUser } = require('../fixtures/checkoutData');

test.describe('Product Management Flow', () => {
  let inventoryPage, productDetailsPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    // Login first
    const loginResult = await loginUser(page, validUser);
    expect(loginResult.success).toBe(true);
  });

  test('should browse inventory and display all products', async () => {
    const result = await browseInventoryFlow(inventoryPage.page);

    expect(result.success).toBe(true);
    expect(result.productCount).toBeGreaterThan(0);
    expect(result.products).toHaveLength(result.productCount);

    // Verify each product has required properties
    result.products.forEach((product) => {
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  test('should sort products by name (A to Z)', async () => {
    const result = await sortProductsFlow(inventoryPage.page, 'az');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('az');

    // Verify products are sorted alphabetically A-Z
    const sortedNames = result.sortedOrder.names;
    const expectedSortedNames = [...sortedNames].sort();
    expect(sortedNames).toEqual(expectedSortedNames);
  });

  test('should sort products by name (Z to A)', async () => {
    const result = await sortProductsFlow(inventoryPage.page, 'za');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('za');

    // Verify products are sorted alphabetically Z-A
    const sortedNames = result.sortedOrder.names;
    const expectedSortedNames = [...sortedNames].sort().reverse();
    expect(sortedNames).toEqual(expectedSortedNames);
  });

  test('should sort products by price (low to high)', async () => {
    const result = await sortProductsFlow(inventoryPage.page, 'lohi');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('lohi');

    // Verify products are sorted by price low to high
    const sortedPrices = result.sortedOrder.prices;
    const expectedSortedPrices = [...sortedPrices].sort((a, b) => a - b);
    expect(sortedPrices).toEqual(expectedSortedPrices);
  });

  test('should sort products by price (high to low)', async () => {
    const result = await sortProductsFlow(inventoryPage.page, 'hilo');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('hilo');

    // Verify products are sorted by price high to low
    const sortedPrices = result.sortedOrder.prices;
    const expectedSortedPrices = [...sortedPrices].sort((a, b) => b - a);
    expect(sortedPrices).toEqual(expectedSortedPrices);
  });

  test('should view product details for Sauce Labs Backpack', async () => {
    const productName = 'Sauce Labs Backpack';
    const result = await viewProductDetailsFlow(inventoryPage.page, productName);

    expect(result.success).toBe(true);
    expect(result.productDetails.name).toBe(productName);
    expect(result.productDetails.description).toBeDefined();
    expect(result.productDetails.price).toBeGreaterThan(0);
    expect(typeof result.productDetails.price).toBe('number');
  });

  test('should view product details for Sauce Labs Bike Light', async () => {
    const productName = 'Sauce Labs Bike Light';
    const result = await viewProductDetailsFlow(inventoryPage.page, productName);

    expect(result.success).toBe(true);
    expect(result.productDetails.name).toBe(productName);
    expect(result.productDetails.description).toBeDefined();
    expect(result.productDetails.price).toBeGreaterThan(0);
  });

  test('should navigate back to products from details page', async () => {
    const productName = 'Sauce Labs Fleece Jacket';

    // Navigate to product details
    await viewProductDetailsFlow(inventoryPage.page, productName);

    // Verify we're on details page
    const currentProductName = await productDetailsPage.getProductName();
    expect(currentProductName).toBe(productName);

    // Navigate back to products
    await productDetailsPage.backToProducts();

    // Verify we're back on inventory page
    await expect(inventoryPage.productList).toBeVisible();
    const productNames = await inventoryPage.getAllProductNames();
    expect(productNames).toContain(productName);
  });

  test('should maintain sorting after viewing product details', async () => {
    // Sort by price high to low
    await sortProductsFlow(inventoryPage.page, 'hilo');

    // Get sorted order before viewing details
    const sortedPricesBefore = await inventoryPage.getAllProductPrices();

    // View product details
    await viewProductDetailsFlow(inventoryPage.page, 'Sauce Labs Backpack');

    // Navigate back
    await productDetailsPage.backToProducts();

    // Verify sorting is maintained
    const sortedPricesAfter = await inventoryPage.getAllProductPrices();
    expect(sortedPricesAfter).toEqual(sortedPricesBefore);
  });
});
