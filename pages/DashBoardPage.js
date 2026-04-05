const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;

    // ✅ Navbar
    this.userName = page.locator('#userName');
    this.logoutButton = page.getByTestId('logout-btn');
    
    // ✅ Stats
    page.getByTestId('total-books')
    this.totalBooks = page.getByTestId('total-books');
    this.availableBooks = page.getByTestId('available-books');
    this.activeMembers = page.getByTestId('active-members');
    this.borrowedBooks = page.getByTestId('borrowed-books');

    // optional stats
    this.overdueBooks = page.getByTestId('overdue-books');
    this.unreturnedBooks = page.getByTestId('unreturned-books');

    this.statsContainer = page.getByTestId('stats-container');

    this.menuContainer = page.getByTestId('menu-container');
    this.borrowingMenu = this.menuContainer.getByTestId('menu-borrowing');
    this.booksMenu = this.menuContainer.getByTestId('menu-books');
    this.membersMenu = this.menuContainer.getByTestId('menu-members');
    this.reportsMenu = this.menuContainer.getByTestId('menu-reports');
  }

  // ======================
  // Navigation
  // ======================

  async goto() {
    await this.page.goto('/dashboard');
  }

  // ======================
  // Assertions (Best Practice)
  // ======================

  async expectToBeOnDashboard() {
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

  async expectUserNameVisible() {
    await expect(this.userName).toHaveText(/.+/);
  }

  async expectDashboardLoaded() {
    await expect(this.userName).toHaveText(/.+/);
  }

  async expectStatsLoaded() {
    await expect(this.totalBooks).not.toHaveText('-');
    await expect(this.availableBooks).not.toHaveText('-');
    await expect(this.activeMembers).not.toHaveText('-');
    await expect(this.borrowedBooks).not.toHaveText('-');
  }

  async expectMenusVisible() {
    await expect(this.booksMenu).toBeVisible();
    await expect(this.membersMenu).toBeVisible();
    await expect(this.borrowingMenu).toBeVisible();
    await expect(this.reportsMenu).toBeVisible();
  }

  async openNavbarIfNeeded() {
  const toggle = this.page.getByRole('button');
  if (await toggle.isVisible()) {
    await toggle.click();
  }
}

  // ======================
  // Actions
  // ======================

  async clickLogout() {
    await this.logoutButton.click();
  }

  async goToBooks() {
    await this.booksMenu.click();
  }

  async goToMembers() {
    await this.membersMenu.click();
  }

  async goToBorrowing() {
    await this.borrowingMenu.click();
  }

  async goToReports() {
    await this.reportsMenu.click();
  }
}

module.exports = DashboardPage;