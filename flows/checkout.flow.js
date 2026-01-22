import { CheckoutPage } from '../pages/checkout.page';
import { addProductsToCart } from './product-management.flow';
import { verifyCartItems } from './cart.flow';

async function completeCheckout(page, products, checkoutInfo) {
  // Add products to cart using inventory flow
  await addProductsToCart(page, products);

  // Verify cart items using cart flow
  await verifyCartItems(page, products.length);

  const completionMessage = await this.fillInformation(page, checkoutInfo);
  if (!completionMessage.includes('Thank you for your order')) {
    throw new Error('Order completion message not found');
  }

  return {
    success: true,
    message: completionMessage,
  };
}

async function fillInformation(page, checkoutInfo) {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutInformation(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  );

  // Complete flow
  await checkoutPage.completeOrder();

  const completionMessage = await checkoutPage.getCompletionMessage();

  return completionMessage;
}

module.exports = { completeCheckout, fillInformation };
