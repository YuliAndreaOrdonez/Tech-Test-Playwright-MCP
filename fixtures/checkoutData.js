const validUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const lockedUser = {
  username: 'locked_out_user',
  password: 'secret_sauce',
};

const invalidUser = {
  username: 'standard_user',
  password: 'wrong_password',
};

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

const multipleProducts = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
];

const checkoutInfo = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

module.exports = {
  validUser,
  lockedUser,
  invalidUser,
  products,
  multipleProducts,
  checkoutInfo,
};
