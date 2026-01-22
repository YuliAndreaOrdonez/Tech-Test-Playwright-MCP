const { test, expect } = require('@playwright/test');
import { loginFlow, checkoutFlow, cartFlow } from '../flows';
const {
  validUser,
  products,
  multipleProducts,
  checkoutInfo
} = require('../fixtures/checkoutData');

test.describe('Complete Checkout Flow', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = page;
    await page.goto('/');
  });

  test('should complete checkout successfully with valid credentials', async () => {
    // Login first
    const loginResult = await loginFlow.loginUser(pages, validUser);
    expect(loginResult.success).toBe(true);

    // Then complete checkout
    const result = await checkoutFlow.completeCheckout(
      pages,
      products,
      checkoutInfo
    );

    expect(result.success).toBe(true);
    expect(result.message).toContain('Thank you for your order');
  });

  test('should add multiple products to cart and complete checkout', async () => {
    // Login first
    const loginResult = await loginFlow.loginUser(pages, validUser);
    expect(loginResult.success).toBe(true);

    // Then complete checkout with multiple products
    const result = await checkoutFlow.completeCheckout(
      pages,
      multipleProducts,
      checkoutInfo
    );

    expect(result.success).toBe(true);
    expect(result.message).toContain('Thank you for your order');
  });

  test('should handle empty cart checkout attempt', async () => {
    // Login first
    const loginResult = await loginFlow.loginUser(pages, validUser);
    expect(loginResult.success).toBe(true);

    cartFlow.verifyCartItems(pages, 0);
    
    const completionMessage = await checkoutFlow.fillInformation(pages, checkoutInfo);
    
    expect(completionMessage).toContain('Thank you for your order');
  });
});
