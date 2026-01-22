const { CartPage } = require('../pages/cart.page');

async function verifyCartItems(page, expectedItemCount) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.goToCart();

  // Verify cart items
  const cartItemCount = await cartPage.getCartItemCount();
  if (cartItemCount !== expectedItemCount) {
    throw new Error(`Expected ${expectedItemCount} items in cart page, got ${cartItemCount}`);
  }
  
  // Proceed to checkout
  await cartPage.proceedToCheckout();

  return {
    success: true,
    cartItemCount: cartItemCount
  };
}

async function goToCart(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.goToCart();
}

module.exports = { verifyCartItems, goToCart };
