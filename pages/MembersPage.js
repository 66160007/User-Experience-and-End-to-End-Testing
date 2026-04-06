import { expect } from '@playwright/test';

export class MembersPage {
  constructor(page) {
    this.page = page;

    // Page
    this.pageHeading = page.getByRole('heading', { name: 'Members Management' });

    // Table
    this.tableBody = page.locator('#membersTableBody');
    this.rows = this.tableBody.locator('tr');

    // Actions
    this.addBtn = page.getByRole('button', { name: '+ Add Member' });

    // Modal (Add)
    this.addModal = page.locator('#addMemberModal');
    this.memberCode = page.getByLabel('Member Code *');
    this.memberName = page.getByLabel('Full Name *');
    this.memberEmail = page.getByLabel('Email');
    this.memberPhone = page.getByLabel('Phone');
    this.memberType = page.getByLabel('Member Type *');
    this.memberMaxBooks = page.getByLabel('Max Books');

    this.saveBtn = this.addModal.getByRole('button', { name: 'Save Member' });

    // Delete buttons
    this.deleteButtons = this.page.locator('button.btn-danger');
  }

  async goto() {
    await this.page.goto('/members');
  }

  async expectLoaded() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.tableBody).toBeVisible();
  }

  async openAddModal() {
    await this.addBtn.click();
    await expect(this.addModal).toBeVisible();
  }

  async addMember(data) {
    await this.openAddModal();

    await this.memberCode.fill(data.code);
    await this.memberName.fill(data.name);
    await this.memberEmail.fill(data.email || '');
    await this.memberPhone.fill(data.phone || '');
    await this.memberType.selectOption(data.type);
    await this.memberMaxBooks.fill(String(data.maxBooks ?? 3));

    await this.saveBtn.click();

    // wait for modal to close
    await expect(this.addModal).toBeHidden();
  }

  async expectRowCount(count) {
    await expect(this.rows).toHaveCount(count);
  }

  async deleteFirstMember() {
    const firstDeleteBtn = this.deleteButtons.first();

    await expect(firstDeleteBtn).toBeVisible();

    // Handle confirm dialog
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await firstDeleteBtn.click();
  }

  async expectTableContains(text) {
    await expect(this.tableBody).toContainText(text);
  }
}