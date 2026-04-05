class LoginPage {
  constructor(page) {
    this.page = page;

    // ✅ ใช้ locator ที่ stable และ readable
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: /login/i });

    // error message (ปรับ selector ตามระบบจริง)
    this.errorMessage = page.getByTestId('error-message');
  }

  // ✅ navigation method
  async goto() {
    await this.page.goto('/login');
  }

  // ✅ granular methods (reusable)
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  // ✅ combined action (ใช้บ่อย)
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  // ✅ utility methods
  async clearFields() {
    await this.usernameInput.fill('');
    await this.passwordInput.fill('');
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }

  async isOnLoginPage() {
    return this.page.url().includes('/login');
  }
}

module.exports = LoginPage;