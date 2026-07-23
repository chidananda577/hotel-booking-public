import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';
import { HotelsPage } from '../pages/HotelsPage';
import { BookingPage } from '../pages/BookingPage';

test.describe('Booking', () => {
  test('logged-in user can create booking and see it in history (regression)', async ({ page }) => {
    const login = new LoginPage(page);
    const hotels = new HotelsPage(page);
    const booking = new BookingPage(page);

    await login.goto();
    await login.login(users.existingUser.email, users.existingUser.password);
    await login.assertOnHotelsPage();

    await hotels.goto();
    await hotels.openFirstHotel();
    await expect(page).toHaveURL(/x\/hotels\/\d+/);

    const bookNowLink = page.getByRole('link', { name: /book/i }).first();
    if (await bookNowLink.count()) {
      await bookNowLink.click();
    } else {
      await page.getByRole('button', { name: /book/i }).first().click();
    }

    await expect(page).toHaveURL(/x\/book\/\d+/);

    const today = new Date();
    const checkIn = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
    const checkOut = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    await booking.book(fmt(checkIn), fmt(checkOut), '2');

    await booking.gotoHistory();
    await booking.assertAnyBookingVisible();
  });
});
