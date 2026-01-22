const { test, expect } = require('@playwright/test');
import { loginFlow, productManagementFlow} from '../flows';
import { validUser } from '../fixtures/checkoutData';

test.describe('Product Management Flow', () => {
  let pages;
  
  test.beforeEach(async ({ page }) => {
    pages = page;
    await page.goto('/');
    // Login first
    const loginResult = await loginFlow.loginUser(pages, validUser);
    expect(loginResult.success).toBe(true);
  });

  test('should browse inventory and display all products', async () => {
    const result = await productManagementFlow.browseInventory(pages);

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
    const result = await productManagementFlow.sortProducts(pages, 'az');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('az');

    // Verify products are sorted alphabetically A-Z
    const sortedNames = result.sortedOrder.names;
    const expectedSortedNames = [...sortedNames].sort();
    expect(sortedNames).toEqual(expectedSortedNames);
  });

  test('should sort products by name (Z to A)', async () => {
    const result = await productManagementFlow.sortProducts(pages, 'za');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('za');

    // Verify products are sorted alphabetically Z-A
    const sortedNames = result.sortedOrder.names;
    const expectedSortedNames = [...sortedNames].sort().reverse();
    expect(sortedNames).toEqual(expectedSortedNames);
  });

  test('should sort products by price (low to high)', async () => {
    const result = await productManagementFlow.sortProducts(pages, 'lohi');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('lohi');

    // Verify products are sorted by price low to high
    const sortedPrices = result.sortedOrder.prices;
    const expectedSortedPrices = [...sortedPrices].sort((a, b) => a - b);
    expect(sortedPrices).toEqual(expectedSortedPrices);
  });

  test('should sort products by price (high to low)', async () => {
    const result = await productManagementFlow.sortProducts(pages, 'hilo');

    expect(result.success).toBe(true);
    expect(result.sortOption).toBe('hilo');

    // Verify products are sorted by price high to low
    const sortedPrices = result.sortedOrder.prices;
    const expectedSortedPrices = [...sortedPrices].sort((a, b) => b - a);
    expect(sortedPrices).toEqual(expectedSortedPrices);
  });

  test('should view product details for Sauce Labs Backpack', async () => {
    const productName = 'Sauce Labs Backpack';
    const result = await productManagementFlow.viewProductDetails(pages, productName);

    expect(result.success).toBe(true);
    expect(result.productDetails.name).toBe(productName);
    expect(result.productDetails.description).toBeDefined();
    expect(result.productDetails.price).toBeGreaterThan(0);
    expect(typeof result.productDetails.price).toBe('number');
  });

  test('should view product details for Sauce Labs Bike Light', async () => {
    const productName = 'Sauce Labs Bike Light';
    const result = await productManagementFlow.viewProductDetails(pages, productName);

    expect(result.success).toBe(true);
    expect(result.productDetails.name).toBe(productName);
    expect(result.productDetails.description).toBeDefined();
    expect(result.productDetails.price).toBeGreaterThan(0);
  });

  test('should navigate back to products from details page', async () => {
    const productName = 'Sauce Labs Fleece Jacket';

    // Navigate to product details
    await productManagementFlow.viewProductDetails(pages, productName);

    const { name } = await productManagementFlow.getProductDetails(pages, productName);
    expect(name).toBe(productName);

    // Navigate back to products
    const productList = await productManagementFlow.backToProducts(pages);

    // Verify we're back on inventory page
    await expect(productList).toBeVisible();
    
    const productNames = await productManagementFlow.getAllProductNames(pages);
    expect(productNames).toContain(productName);
  });
});
