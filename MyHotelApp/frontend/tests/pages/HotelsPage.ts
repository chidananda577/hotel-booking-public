import { expect, Page } from '@playwright/test';

export class HotelsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/hotels');
    await expect(this.page).toHaveURL(/x\/hotels/);
  }

  async assertHotelsVisible() {
    await expect(this.page.locator('main')).toBeVisible();
  }

  async search(query: string) {
    const searchBox = this.page.getByPlaceholder(/search/i);
    if (await searchBox.count()) {
      await searchBox.fill(query);
    }
  }

  async openFirstHotel() {
    const detailsLink = this.page.getByRole('link', { name: /details/i }).first();
    if (await detailsLink.count()) {
      await detailsLink.click();
      return;
    }

    const firstHotelLink = this.page.locator('a[href^="/hotels/"]').first();
    await expect(firstHotelLink).toBeVisible();
    await firstHotelLink.click();
  }

  async assertOnHotelDetails() {
    await expect(this.page).toHaveURL(/^\/hotels\/\d+/);
  }
}
