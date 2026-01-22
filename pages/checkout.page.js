class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.completeHeader = page.locator('[data-test="checkout-complete-container"]');
  }

  async navigate() {
    await this.page.goto('/checkout-step-one.html');
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

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

module.exports = { CheckoutPage };
