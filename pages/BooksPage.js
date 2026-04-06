import { expect } from '@playwright/test';

export class BooksPage {
  constructor(page) {
    this.page = page;

    // elements (based on your HTML)
    this.pageContainer = page.getByTestId('books-page');

    this.tableBody = page.getByTestId('books-table-body');
    this.rows = page.getByTestId('book-row');

    this.addBookBtn = page.getByTestId('add-book-btn');

    this.searchInput = page.getByTestId('search-input');
    this.searchBtn = page.getByTestId('search-btn');
    this.clearSearchBtn = page.getByTestId('clear-search-btn');

    this.addModal = page.getByTestId('add-book-modal');
    this.editModal = page.getByTestId('edit-book-modal');
  }

  async goto() {
    await this.page.goto('/books');
  }

  async expectLoaded() {
    await expect(this.pageContainer).toBeVisible();
    await expect(this.tableBody).toBeVisible();
  }

  async expectRowCount(count) {
    await expect(this.rows).toHaveCount(count);
  }

  async searchBook(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchBtn.click();
  }

  async clearSearch() {
    await this.clearSearchBtn.click();
  }

  async openAddBookModal() {
    await this.addBookBtn.click();
    await expect(this.addModal).toBeVisible();
  }

  async openEditByIndex(index = 0) {
    await this.rows.nth(index).getByTestId('edit-book-btn').click();
    await expect(this.editModal).toBeVisible();
  }
}