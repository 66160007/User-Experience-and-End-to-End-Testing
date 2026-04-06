export class ReportsPage {
  constructor(page) {
    this.page = page;

    // tables
    this.overdueTableBody = page.getByTestId('overdue-table-body');
    this.topBooksTableBody = page.getByTestId('top-books-table-body');
    this.activeMembersTableBody = page.getByTestId('active-members-table-body');

    // navbar
    this.userName = page.getByTestId('user-name');
  }

  async goto() {
    await this.page.goto('/reports');
  }

  async expectLoaded() {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Reports').waitFor();
  }

  // ---- Overdue ----
  async getOverdueRows() {
    return this.overdueTableBody.locator('tr');
  }

  async getOverdueCount() {
    return await this.getOverdueRows().count();
  }

  // ---- Top Books ----
  async getTopBooksRows() {
    return this.topBooksTableBody.locator('tr');
  }

  async getTopBooksCount() {
    return await this.getTopBooksRows().count();
  }

  // ---- Active Members ----
  async getActiveMembersRows() {
    return this.activeMembersTableBody.locator('tr');
  }

  async getActiveMembersCount() {
    return await this.getActiveMembersRows().count();
  }
}