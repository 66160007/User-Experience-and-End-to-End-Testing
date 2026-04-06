import { test, expect } from '@playwright/test';
import { ReportsPage } from '../../pages/ReportsPage';

test.describe('Reports Page', () => {
  let reportsPage;

  test.beforeEach(async ({ page }) => {
    reportsPage = new ReportsPage(page);

    // mock APIs
    await page.route('/api/borrowing/overdue', async (route) => {
      await route.fulfill({
        json: [
          {
            member_name: 'John Doe',
            book_title: 'Clean Code',
            due_date: '2025-01-01',
          },
        ],
      });
    });

    await page.route('/api/books', async (route) => {
      await route.fulfill({
        json: [
          { title: 'Book A', author: 'Author A' },
          { title: 'Book B', author: 'Author B' },
        ],
      });
    });

    await page.route('/api/members', async (route) => {
      await route.fulfill({
        json: [
          { full_name: 'Member A' },
          { full_name: 'Member B' },
        ],
      });
    });

    // go page
    await reportsPage.goto();
    await reportsPage.expectLoaded();
  });

  test('should display overdue books', async () => {
    await expect(reportsPage.getOverdueRows()).toHaveCount(1);
  });

  test('should display top books', async () => {
    await expect(reportsPage.getTopBooksRows()).toHaveCount(2);
  });

  test('should display active members', async () => {
    await expect(reportsPage.getActiveMembersRows()).toHaveCount(2);
  });
});