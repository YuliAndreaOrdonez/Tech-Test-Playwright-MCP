const { test, expect } = require('@playwright/test');
const { loginUser } = require('../flows/login.flow');
const {
  addItemsToCartFlow,
  viewCartItemsFlow,
  removeItemFromCartFlow,
  continueShoppingFlow,
  proceedToCheckoutFlow,
} = require('../flows/cart-operations.flow');
const { InventoryPage, CartPage } = require('../pages');
const { validUser } = require('../fixtures/checkoutData');

test.describe('Cart Operations Flow', () => {
  let inventoryPage, cartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Login first
    const loginResult = await loginUser(page, validUser);
    expect(loginResult.success).toBe(true);
  });

  test('should add single item to cart', async () => {
    const products = ['Sauce Labs Backpack'];
    const result = await addItemsToCartFlow(inventoryPage.page, products);

    expect(result.success).toBe(true);
    expect(result.cartCount).toBe(1);
    expect(result.productsAdded).toEqual(products);
  });

  test('should add multiple items to cart', async () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    const result = await addItemsToCartFlow(inventoryPage.page, products);

    expect(result.success).toBe(true);
    expect(result.cartCount).toBe(3);
    expect(result.productsAdded).toEqual(products);
  });

  test('should view cart items', async () => {
    // First add some items
    await addItemsToCartFlow(inventoryPage.page, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    // Then view cart
    const result = await viewCartItemsFlow(cartPage.page);

    expect(result.success).toBe(true);
    expect(result.cartItemCount).toBe(2);
  });

  test('should remove item from cart', async () => {
    // First add items
    await addItemsToCartFlow(inventoryPage.page, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    // Remove one item
    const removeResult = await removeItemFromCartFlow(cartPage.page, 'Sauce Labs Backpack');

    expect(removeResult.success).toBe(true);
    expect(removeResult.removedProduct).toBe('Sauce Labs Backpack');
    expect(removeResult.newCartCount).toBe(1);
  });

  test('should continue shopping from cart', async () => {
    // First add items and go to cart
    await addItemsToCartFlow(inventoryPage.page, ['Sauce Labs Backpack']);
    await cartPage.navigate();

    // Continue shopping
    const result = await continueShoppingFlow(cartPage.page);

    expect(result.success).toBe(true);
    expect(result.action).toBe('continued shopping');

    // Verify we're back on inventory page
    await expect(inventoryPage.productList).toBeVisible();
  });

  test('should proceed to checkout from cart', async () => {
    // First add items and go to cart
    await addItemsToCartFlow(inventoryPage.page, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await cartPage.navigate();

    // Proceed to checkout
    const result = await proceedToCheckoutFlow(cartPage.page);

    expect(result.success).toBe(true);
    expect(result.action).toBe('proceeded to checkout');
  });

  test('should handle empty cart operations', async () => {
    // Go to cart with no items
    await cartPage.navigate();

    const result = await viewCartItemsFlow(cartPage.page);

    expect(result.success).toBe(true);
    expect(result.cartItemCount).toBe(0);
  });

  test('should add items then remove all items one by one', async () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    // Add all items
    const addResult = await addItemsToCartFlow(inventoryPage.page, products);
    expect(addResult.success).toBe(true);
    expect(addResult.cartCount).toBe(3);

    // Go to cart
    await cartPage.navigate();

    // Remove items one by one
    for (const product of products) {
      const removeResult = await removeItemFromCartFlow(cartPage.page, product);
      expect(removeResult.success).toBe(true);
    }

    // Verify cart is empty
    const finalResult = await viewCartItemsFlow(cartPage.page);
    expect(finalResult.cartItemCount).toBe(0);
  });

  test('should maintain cart state when navigating between pages', async () => {
    // Add items to cart
    await addItemsToCartFlow(inventoryPage.page, ['Sauce Labs Backpack']);

    // Go to cart and verify
    await cartPage.navigate();
    const cartResult1 = await viewCartItemsFlow(cartPage.page);
    expect(cartResult1.cartItemCount).toBe(1);

    // Continue shopping
    await continueShoppingFlow(cartPage.page);

    // Go back to cart and verify items are still there
    await cartPage.navigate();
    const cartResult2 = await viewCartItemsFlow(cartPage.page);
    expect(cartResult2.cartItemCount).toBe(1);
  });
});
