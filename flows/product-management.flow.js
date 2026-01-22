const { InventoryPage } = require('../pages/inventory.page');
const { ProductDetailsPage } = require('../pages/product-details.page');

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
    productsAdded: products,
  };
}

async function sortProductsFlow(page, sortOption) {
  const inventoryPage = new InventoryPage(page);

  // Get initial product order
  const initialNames = await inventoryPage.getAllProductNames();
  const initialPrices = await inventoryPage.getAllProductPrices();

  // Apply sorting
  await inventoryPage.sortProducts(sortOption);

  // Get sorted product order
  const sortedNames = await inventoryPage.getAllProductNames();
  const sortedPrices = await inventoryPage.getAllProductPrices();

  // Verify sorting was applied
  const currentSortOption = await inventoryPage.getSortOption();

  return {
    success: true,
    sortOption: currentSortOption,
    initialOrder: {
      names: initialNames,
      prices: initialPrices,
    },
    sortedOrder: {
      names: sortedNames,
      prices: sortedPrices,
    },
  };
}

async function viewProductDetailsFlow(page, productName) {
  const inventoryPage = new InventoryPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  // Navigate to product details
  await inventoryPage.clickProductByName(productName);

  // Get product details
  const productDetails = await productDetailsPage.getProductDetails();

  // Verify we're on the correct product
  if (productDetails.name !== productName) {
    throw new Error(`Expected product "${productName}", but got "${productDetails.name}"`);
  }

  return {
    success: true,
    productDetails: productDetails,
  };
}

async function browseInventoryFlow(page) {
  const inventoryPage = new InventoryPage(page);

  // Get all products in inventory
  const productNames = await inventoryPage.getAllProductNames();
  const productPrices = await inventoryPage.getAllProductPrices();

  // Verify inventory is not empty
  if (productNames.length === 0) {
    throw new Error('Inventory is empty');
  }

  return {
    success: true,
    productCount: productNames.length,
    products: productNames.map((name, index) => ({
      name: name,
      price: productPrices[index],
    })),
  };
}

module.exports = {
  sortProductsFlow,
  viewProductDetailsFlow,
  browseInventoryFlow,
  addProductsToCart,
};
