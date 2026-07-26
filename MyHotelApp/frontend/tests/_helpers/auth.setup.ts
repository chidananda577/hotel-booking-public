import { test as setup } from '@playwright/test';
import users from '../test-data/users.json' assert { type: 'json' };
import { uniqueEmail, apiContext, registerUser } from './testUtils';
import { LoginPage } from '../pages/LoginPage';

const storageStatePath = 'playwright/.auth/user.json';

setup('auth setup - create user and store session', async ({ page }) => {
  const api = await apiContext();
  const email = uniqueEmail(users.validUser.emailPrefix);

  await registerUser(api, {
    firstName: users.validUser.firstName,
    lastName: users.validUser.lastName,
    email,
    password: users.validUser.password,
  });

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, users.validUser.password);
  await loginPage.assertLoggedIn();

  await page.context().storageState({ path: storageStatePath });
});
