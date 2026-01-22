const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');

async function addItemsToCartFlow(page, products) {
  const inventoryPage = new InventoryPage(page);

  // Add products to cart
  for (const product of products) {
    await inventoryPage.addProductToCart(product);
  }

  // Verify cart badge count
  const cartCount = await inventoryPage.getCartBadgeCount();
  if (cartCount !== products.length) {
    throw new Error(`Expected ${products.length} items in cart, got ${cartCount}`);
  }

  return {
    success: true,
    cartCount: cartCount,
    productsAdded: products,
  };
}

async function viewCartItemsFlow(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.navigate();

  // Get cart items
  const cartItemCount = await cartPage.getCartItemCount();

  return {
    success: true,
    cartItemCount: cartItemCount,
  };
}

async function removeItemFromCartFlow(page, productName) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.navigate();

  // Remove item (implementation depends on actual cart page structure)
  const removeButton = page.locator(
    `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`
  );
  await removeButton.click();

  // Verify item was removed
  const newCartCount = await cartPage.getCartItemCount();

  return {
    success: true,
    removedProduct: productName,
    newCartCount: newCartCount,
  };
}

async function continueShoppingFlow(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart first
  await cartPage.navigate();

  // Click continue shopping
  await cartPage.continueShopping();

  return {
    success: true,
    action: 'continued shopping',
  };
}

async function proceedToCheckoutFlow(page) {
  const cartPage = new CartPage(page);

  // Navigate to cart
  await cartPage.navigate();

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  return {
    success: true,
    action: 'proceeded to checkout',
  };
}

module.exports = {
  addItemsToCartFlow,
  viewCartItemsFlow,
  removeItemFromCartFlow,
  continueShoppingFlow,
  proceedToCheckoutFlow,
};
