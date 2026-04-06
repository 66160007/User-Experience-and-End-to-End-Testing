import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { BorrowingPage } from '../../pages/BorrowingPage';

test.describe('Borrowing Page', () => {
  let loginPage;
  let dashboardPage;
  let borrowingPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    borrowingPage = new BorrowingPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');

    // Step 2: Dashboard
    await dashboardPage.expectToBeOnDashboard();

    // Step 3: Navigate
    await page.getByRole('link', { name: 'Borrowing' }).click();

    // Step 4: Ensure page loaded
    await borrowingPage.expectLoaded();
  });

  test('should display borrowing table', async () => {
    await expect(borrowingPage.rows.first()).toBeVisible();
  });

  test('should create new borrow', async () => {
    await borrowingPage.createBorrow({
      memberId: '1',
      bookId: '1',
      borrowDate: '2026-01-01',
      dueDate: '2026-01-15',
    });

    await borrowingPage.expectTableContains('Borrowed');
  });

  test('should return a book', async () => {
    const initialCount = await borrowingPage.rows.count();

    await borrowingPage.returnFirstBorrow();

    // wait for table update
    await expect(borrowingPage.rows).toHaveCount(initialCount);
    await borrowingPage.expectTableContains('Returned');
  });

  test('should view borrowing details', async () => {
    // stub alert
    test.info().annotations.push({ type: 'note', description: 'View details uses alert popup' });

    await borrowingPage.viewFirstDetails();

    // validate via dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Member:');
      await dialog.accept();
    });
  });
});