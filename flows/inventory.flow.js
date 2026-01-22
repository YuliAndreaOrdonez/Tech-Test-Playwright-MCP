const { InventoryPage } = require('../pages/inventory.page');

async function addProductsToCart(page, products) {
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
    productsAdded: products
  };
}

module.exports = { addProductsToCart };
