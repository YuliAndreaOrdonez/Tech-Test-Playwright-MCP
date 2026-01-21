const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { CheckoutPage } = require('../pages/checkout.page');

async function completeCheckoutFlow(page, user, products, checkoutInfo) {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.login(user.username, user.password);

  // Add products to cart
  for (const product of products) {
    await inventoryPage.addProductToCart(product);
  }

  // Verify cart badge count
  const cartCount = await inventoryPage.getCartBadgeCount();
  if (cartCount !== products.length) {
    throw new Error(`Expected ${products.length} items in cart, got ${cartCount}`);
  }

  // Navigate to cart
  await page.goto('/cart.html');

  // Verify cart items
  const cartItemCount = await cartPage.getCartItemCount();
  if (cartItemCount !== products.length) {
    throw new Error(`Expected ${products.length} items in cart page, got ${cartItemCount}`);
  }

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  // Fill checkout information
  await checkoutPage.fillCheckoutInformation(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  );

  // Complete order
  await checkoutPage.completeOrder();

  // Verify completion
  const completionMessage = await checkoutPage.getCompletionMessage();
  if (!completionMessage.includes('Thank you for your order')) {
    throw new Error('Order completion message not found');
  }

  return {
    success: true,
    message: completionMessage,
    orderTotal: await checkoutPage.getOrderTotal(),
  };
}

module.exports = { completeCheckoutFlow };
