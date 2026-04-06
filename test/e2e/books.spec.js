import { test, expect } from '@playwright/test';
import { BooksPage } from '../../pages/BooksPage';
import { mockBooksAPI } from '../mocks/mockBooksApi';

test.describe('Books Page', () => {

  test.beforeEach(async ({ page }) => {
    await mockBooksAPI(page);
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.expectLoaded();
  });

  test('should display books table', async ({ page }) => {
    const booksPage = new BooksPage(page);

    // table should have rows (depends on API seed)
    await expect(booksPage.rows.first()).toBeVisible();
  });

  test('should search book', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.searchBook('Harry Potter');

    await expect(booksPage.tableBody).toContainText('Harry Potter');
  });

  test('should clear search', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.searchBook('Harry Potter');
    await booksPage.clearSearch();

    // after clear → should reload data
    await expect(booksPage.rows.first()).toBeVisible();
  });

  test('should open add book modal', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.openAddBookModal();
  });

  test('should open edit modal', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.openEditByIndex(0);
  });

});