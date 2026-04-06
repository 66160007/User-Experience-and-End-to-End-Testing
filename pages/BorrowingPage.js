import { expect } from '@playwright/test';

export class BorrowingPage {
  constructor(page) {
    this.page = page;

    // Page
    this.heading = page.getByRole('heading', { name: 'Borrowing Management' });

    // Table
    this.tableBody = page.locator('#borrowingTableBody');
    this.rows = this.tableBody.locator('tr');

    // Actions
    this.addBtn = page.getByRole('button', { name: '+ New Borrow' });

    // Modal
    this.addModal = page.locator('#addBorrowModal');

    this.memberSelect = page.locator('#borrowMemberId');
    this.bookSelect = page.locator('#borrowBookId');
    this.borrowDate = page.locator('#borrowDate');
    this.dueDate = page.locator('#dueDate');

    this.saveBtn = this.addModal.getByRole('button', { name: 'Save Borrow' });

    // Row actions
    this.returnButtons = this.page.getByRole('button', { name: 'Return' });
    this.detailsButtons = this.page.getByRole('button', { name: 'Details' });
  }

  async goto() {
    await this.page.goto('/borrowing');
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.tableBody).toBeVisible();
  }

  async openAddModal() {
    await this.addBtn.click();
    await expect(this.addModal).toBeVisible();
  }

  async createBorrow(data) {
    await this.openAddModal();

    await this.memberSelect.selectOption(data.memberId);
    await this.bookSelect.selectOption(data.bookId);

    await this.borrowDate.fill(data.borrowDate);
    await this.dueDate.fill(data.dueDate);

    await this.saveBtn.click();

    await expect(this.addModal).toBeHidden();
  }

  async expectRowCount(count) {
    await expect(this.rows).toHaveCount(count);
  }

  async returnFirstBorrow() {
    const btn = this.returnButtons.first();

    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await btn.click();
  }

  async viewFirstDetails() {
    await this.detailsButtons.first().click();
  }

  async expectTableContains(text) {
    await expect(this.tableBody).toContainText(text);
  }
}