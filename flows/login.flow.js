const { LoginPage } = require('../pages/login.page');

async function loginUser(page, user) {
  const loginPage = new LoginPage(page);

  // Perform login
  await loginPage.login(user.username, user.password);

  // Check for error message if login failed
  const errorMessage = await loginPage.getErrorMessage();

  return {
    success: !errorMessage,
    error: errorMessage,
    page: loginPage.page,
  };
}

module.exports = { loginUser };
