import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { MembersPage } from '../../pages/MembersPage';

test.describe('Members Page', () => {
  let loginPage;
  let dashboardPage;
  let membersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    membersPage = new MembersPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');

    // Step 2: Verify dashboard
    await dashboardPage.expectToBeOnDashboard();

    // Step 3: Navigate via UI (real user flow)
    await page.getByRole('link', { name: 'Members' }).click();

    // Step 4: Ensure page loaded
    await membersPage.expectLoaded();
  });

  test('should display members table', async () => {
    await expect(membersPage.rows.first()).toBeVisible();
  });

  test('should add new member', async () => {
    await membersPage.addMember({
      code: 'M001',
      name: 'John Doe',
      email: 'john@test.com',
      phone: '123456789',
      type: 'student',
      maxBooks: 3,
    });

    await membersPage.expectTableContains('John Doe');
  });

  test('should delete a member', async () => {
    const initialCount = await membersPage.rows.count();

    await membersPage.deleteFirstMember();

    await expect(membersPage.rows).toHaveCount(initialCount - 1);
  });
});