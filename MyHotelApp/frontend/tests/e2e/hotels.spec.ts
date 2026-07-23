import { test } from '@playwright/test';
import { HotelsPage } from '../pages/HotelsPage';

test.describe('Hotels', () => {
  test('can view hotels and open details (smoke)', async ({ page }) => {
    const hotels = new HotelsPage(page);
    await hotels.goto();
    await hotels.assertHotelsVisible();

    await hotels.openFirstHotel();
    await hotels.assertOnHotelDetails();
  });
});
