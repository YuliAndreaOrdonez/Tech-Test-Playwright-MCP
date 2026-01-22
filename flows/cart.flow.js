import { CartPage } from '../pages';

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
  const cartTitle = await cartPage.getCartTitle();
  return {
    success: true,
    cartItemCount: cartItemCount,
    cartTitle: cartTitle
  };
}

async function goToCart(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.goToCart();
}

async function viewCartItems(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.goToCart();

  // Get cart items
  const cartItemCount = await cartPage.getCartItemCount();

  return {
    success: true,
    cartItemCount: cartItemCount,
  };
}

async function removeItemFromCart(page, productName) {
  const cartPage = new CartPage(page);

  await cartPage.removeItem(productName);

  // Verify item was removed
  const newCartCount = await cartPage.getCartItemCount();

  return {
    success: true,
    removedProduct: productName,
    newCartCount: newCartCount,
  };
}

async function continueShopping(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart first
  await cartPage.goToCart();

  // Click continue shopping
  await cartPage.continueShopping();

  return {
    success: true,
    action: 'continued shopping',
  };
}

async function proceedToCheckout(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.goToCart();

  // Proceed to checkout
  await cartPage.proceedToCheckout();
  const title = await cartPage.getCartTitle();
  return {
    success: true,
    action: 'proceeded to checkout',
    title: title,
  };
}

module.exports = { 
  verifyCartItems, 
  goToCart,
  viewCartItems,
  removeItemFromCart,
  continueShopping,
  proceedToCheckout,
};
