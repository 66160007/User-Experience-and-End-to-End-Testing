const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('Dashboard Functionality', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    // Arrange
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');

    await dashboardPage.expectToBeOnDashboard();
  });

  test('should display dashboard data correctly', async () => {
    // Assert
    await dashboardPage.expectUserNameVisible();
    await dashboardPage.expectStatsLoaded();
    await dashboardPage.expectMenusVisible();
  });

  test('should navigate to books page', async () => {
    // Act
    await dashboardPage.goToBooks();

    // Assert
    await expect(dashboardPage.page).toHaveURL(/.*books/);
  });

  test('should navigate to members page', async () => {
    // Act
    await dashboardPage.goToMembers();

    // Assert
    await expect(dashboardPage.page).toHaveURL(/.*members/);
  });

  test('should navigate to borrowing page', async () => {
    // Act
    await dashboardPage.goToBorrowing();

    // Assert
    await expect(dashboardPage.page).toHaveURL(/.*borrowing/);
  });

  test('should navigate to reports page', async () => {
    // Act
    await dashboardPage.goToReports();

    // Assert
    await expect(dashboardPage.page).toHaveURL(/.*reports/);
  });

  test('should logout successfully', async ({ page }) => {
    await dashboardPage.clickLogout();
    await expect(page).toHaveURL(/.*login/);
  });

});