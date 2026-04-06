import { test, expect } from '@playwright/test';
import { BooksPage } from '../../pages/BooksPage';

test.describe('Books Page (Mocked API)', () => {

  test.beforeEach(async ({ page }) => {

    // mock API
    await page.route('/api/books', async (route) => {
      const mockBooks = [
        {
          id: 1,
          title: 'Harry Potter',
          author: 'J.K. Rowling',
          isbn: '123456',
          total_copies: 5,
          available_copies: 3
        },
        {
          id: 2,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          isbn: '789101',
          total_copies: 3,
          available_copies: 2
        }
      ];

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBooks),
      });
    });

    const booksPage = new BooksPage(page);
    await booksPage.goto();
    await booksPage.expectLoaded();
  });

  test('should display mocked books', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await expect(booksPage.rows).toHaveCount(2);
    await expect(page.getByText('Harry Potter')).toBeVisible();
    await expect(page.getByText('Clean Code')).toBeVisible();
  });

});