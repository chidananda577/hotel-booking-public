import { expect, Page } from '@playwright/test';

export class BookingPage {
  constructor(private page: Page) {}

  async book(checkIn: string, checkOut: string, guests: string) {
    const checkInInput = this.page.locator('input[type="date"]').nth(0);
    const checkOutInput = this.page.locator('input[type="date"]').nth(1);

    await checkInInput.fill(checkIn);
    await checkOutInput.fill(checkOut);

    const guestsInput = this.page.locator('input[type="number"]');
    if (await guestsInput.count()) {
      await guestsInput.fill(guests);
    }

    await this.page.getByRole('button', { name: /confirm|book|create/i }).click();
  }

  async gotoHistory() {
    await this.page.goto('/bookings');
    await expect(this.page).toHaveURL(/x\/bookings/);
  }

  async cancelFirstBooking() {
    const cancelBtn = this.page.getByRole('button', { name: /cancel/i }).first();
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();
  }

  async assertAnyBookingVisible() {
    await expect(this.page.locator('main')).toBeVisible();
  }
}

