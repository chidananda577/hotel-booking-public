import { expect, Page } from '@playwright/test';

version export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async assertOnHotelsPage() {
    await expect(this.page).toHaveURL(/x\/hotels/);
  }

  async assertLoginError() {
    await expect(this.page.locator('div', { hasText: 'Login' }).first()).toBeVisible();
  }
}
