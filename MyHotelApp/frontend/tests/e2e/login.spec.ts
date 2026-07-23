import { test } from '@playwright/test';
import users from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';

test.describe('User Login', () => {
  test('logs in with existing user (smoke)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(users.existingUser.email, users.existingUser.password);
    await loginPage.assertOnHotelsPage();
  });
});
