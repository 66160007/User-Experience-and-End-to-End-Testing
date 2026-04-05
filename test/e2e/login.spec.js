const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with admin credentials', async () => {
    await loginPage.login('admin', 'admin123');
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
});

  test('should login successfully with librarian credentials', async () => {
    await loginPage.login('librarian', 'lib123');
    await expect(loginPage.page).toHaveURL(/.*dashboard/);
  });

  test('should show error with invalid username', async () => {
    await loginPage.login('invaliduser', 'admin123');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid');
  });

  test('should show error with invalid password', async () => {
    await loginPage.login('admin', 'wrongpassword');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid');
  });

  test('should show error with empty username', async () => {
    await loginPage.login('', 'admin123');

    // ตรวจว่า browser block submit (HTML5 validation)
    await expect(loginPage.usernameInput).toHaveAttribute('required', '');
    await expect(loginPage.page).toHaveURL(/.*login/);
  });

  test('should show error with empty password', async () => {
    await loginPage.login('admin', '');

    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
    await expect(loginPage.page).toHaveURL(/.*login/);
  });

  test('should clear fields correctly', async () => {
    await loginPage.fillUsername('testuser');
  await loginPage.fillPassword('testpass');

  await loginPage.clearFields();

  await expect(loginPage.usernameInput).toHaveValue('');
  await expect(loginPage.passwordInput).toHaveValue('');
  });
});
