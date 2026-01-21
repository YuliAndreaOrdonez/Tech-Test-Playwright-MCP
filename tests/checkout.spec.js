const { test, expect } = require('@playwright/test');
const { completeCheckoutFlow } = require('../flows/checkout.flow');

test.describe('Complete Checkout Flow', () => {
  const validUser = {
    username: 'standard_user',
    password: 'secret_sauce',
  };

  const lockedUser = {
    username: 'locked_out_user',
    password: 'secret_sauce',
  };

  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  const checkoutInfo = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  };

  test('should complete checkout successfully with valid credentials', async ({ page }) => {
    const result = await completeCheckoutFlow(page, validUser, products, checkoutInfo);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Thank you for your order');
    expect(result.orderTotal).toBeDefined();
  });

  test('should fail login with locked user', async ({ page }) => {
    await page.goto('/');

    const { LoginPage } = require('../pages/login.page');
    const loginPage = new LoginPage(page);

    await loginPage.login(lockedUser.username, lockedUser.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  });

  test('should fail login with invalid password', async ({ page }) => {
    await page.goto('/');

    const { LoginPage } = require('../pages/login.page');
    const loginPage = new LoginPage(page);

    const invalidUser = {
      username: 'standard_user',
      password: 'wrong_password',
    };

    await loginPage.login(invalidUser.username, invalidUser.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('username and password do not match');
  });

  test('should add multiple products to cart and complete checkout', async ({ page }) => {
    const multipleProducts = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    const result = await completeCheckoutFlow(page, validUser, multipleProducts, checkoutInfo);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Thank you for your order');
  });

  test('should handle empty cart checkout attempt', async ({ page }) => {
    await page.goto('/');

    const { LoginPage } = require('../pages/login.page');
    const { CartPage } = require('../pages/cart.page');
    const { CheckoutPage } = require('../pages/checkout.page');

    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login(validUser.username, validUser.password);
    await page.goto('/cart.html');

    // Try to proceed with empty cart
    await cartPage.proceedToCheckout();

    // Should still be able to fill checkout info even with empty cart
    await checkoutPage.fillCheckoutInformation(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );

    // Complete the flow
    await checkoutPage.completeOrder();

    const completionMessage = await checkoutPage.getCompletionMessage();
    expect(completionMessage).toContain('Thank you for your order');
  });
});
