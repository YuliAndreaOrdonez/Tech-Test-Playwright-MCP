import { test, expect } from '@playwright/test';
import { loginFlow, cartFlow, productManagementFlow } from '../flows';
import { validUser } from '../fixtures/checkoutData';

test.describe('Cart Operations Flow', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = page;
    await page.goto('/');
    // Login first
    const loginResult = await loginFlow.loginUser(pages, validUser);
    expect(loginResult.success).toBe(true);
  });

  test('should add single item to cart', async () => {
    const products = ['Sauce Labs Backpack'];
    const result = await productManagementFlow.addProductsToCart(pages, products);

    expect(result.success).toBe(true);
    expect(result.cartCount).toBe(1); 
    expect(result.productsAdded).toEqual(products);
  });

  test('should add multiple items to cart', async () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    const result = await productManagementFlow.addProductsToCart(pages, products);

    expect(result.success).toBe(true);
    expect(result.cartCount).toBe(3);
    expect(result.productsAdded).toEqual(products);
  });

  test('should view cart items', async () => {
    // First add some items
    await productManagementFlow.addProductsToCart(pages, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    // Then view cart
    const result = await cartFlow.viewCartItems(pages);

    expect(result.success).toBe(true);
    expect(result.cartItemCount).toBe(2);
  });

  test('should remove item from cart', async () => {
    // First add items
    await productManagementFlow.addProductsToCart(pages, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await cartFlow.goToCart(pages);

    // Remove one item
    const removeResult = await cartFlow.removeItemFromCart(pages, 'Sauce Labs Backpack');

    expect(removeResult.success).toBe(true);
    expect(removeResult.removedProduct).toBe('Sauce Labs Backpack');
    expect(removeResult.newCartCount).toBe(1);
  });

  test('should continue shopping from cart', async () => {
    // First add items and go to cart
    await productManagementFlow.addProductsToCart(pages, ['Sauce Labs Backpack']);
    await cartFlow.goToCart(pages);

    // Continue shopping
    const result = await cartFlow.continueShopping(pages);

    expect(result.success).toBe(true);
    expect(result.action).toBe('continued shopping');

    // Verify we're back on inventory page
    const productList = await productManagementFlow.getProductList(pages);
    await expect(productList).toBeVisible();
  });

  test('should proceed to checkout from cart', async () => {
    // First add items and go to cart
    await productManagementFlow.addProductsToCart(pages, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await cartFlow.goToCart(pages);

    // Proceed to checkout
    const result = await cartFlow.proceedToCheckout(pages);

    expect(result.success).toBe(true);
    expect(result.action).toBe('proceeded to checkout');
    expect(result.title).toBe('Checkout: Your Information');
  });

  test('should handle empty cart operations', async () => {
    // Go to cart with no items
    await cartFlow.goToCart(pages);

    const result = await cartFlow.viewCartItems(pages);

    expect(result.success).toBe(true);
    expect(result.cartItemCount).toBe(0);
  });

  test('should add items then remove all items one by one', async () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    // Add all items
    const addResult = await productManagementFlow.addProductsToCart(pages, products);
    expect(addResult.success).toBe(true);
    expect(addResult.cartCount).toBe(3);

    // Go to cart
    await cartFlow.goToCart(pages);

    // Remove items one by one
    for (const product of products) {
      const removeResult = await cartFlow.removeItemFromCart(pages, product);
      expect(removeResult.success).toBe(true);
    }

    // Verify cart is empty
    const finalResult = await cartFlow.viewCartItems(pages);
    expect(finalResult.cartItemCount).toBe(0);
  });

  test('should maintain cart state when navigating between pages', async () => {
    // Add items to cart
    await productManagementFlow.addProductsToCart(pages, ['Sauce Labs Backpack']);

    // Go to cart and verify
    await cartFlow.goToCart(pages);
    const cartResult1 = await cartFlow.viewCartItems(pages);
    expect(cartResult1.cartItemCount).toBe(1);

    // Continue shopping
    await cartFlow.continueShopping(pages);

    // Go back to cart and verify items are still there
    await cartFlow.goToCart(pages);
    const cartResult2 = await cartFlow.viewCartItems(pages);
    expect(cartResult2.cartItemCount).toBe(1);
  });
});
