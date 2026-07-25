import { expect, Locator, Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.getByLabel(/name/i).or(page.getByPlaceholder(/name/i));
    this.email = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    this.password = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    this.registerButton = page.getByRole('button', { name: /register|sign up/i });
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(name: string, email: string, password: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerButton.click();
  }

  async assertRegistrationSuccess() {
    await expect(
      this.page.getByText(/registered|success|login/i).or(this.page.getByRole('heading', { name: /login|register/i }))
    ).toBeVisible();
  }
}
