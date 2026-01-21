class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.completeHeader = page.getByTestId('checkout-complete-container');
    this.orderTotal = page.getByTestId('summary-total-label');
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async getCompletionMessage() {
    return await this.completeHeader.textContent();
  }

  async getOrderTotal() {
    const totalText = await this.orderTotal.textContent();
    return totalText;
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

module.exports = { CheckoutPage };
