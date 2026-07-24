import { test, expect } from '@playwright/test';

const API = process.env.API_BASE_URL ?? 'http://localhost:8080/api';

test.describe('API - Hotels', () => {
  test('GET /hotels @smoke @regression', async ({ request }) => {
    const res = await request.get(`${API}/hotels`);
    expect(res.ok()).toBeTruthy();

    const hotels = await res.json();
    expect(Array.isArray(hotels)).toBeTruthy();
  });

  test('GET /hotels/{id} @regression', async ({ request }) => {
    const list = await request.get(`${API}/hotels`);
    expect(list.ok()).toBeTruthy();
    const hotels = await list.json();

    if (!hotels.length) test.skip('No hotels available');

    const id = hotels[0].id;
    const res = await request.get(`${API}/hotels/${id}`);
    expect(res.ok()).toBeTruthy();

    const hotel = await res.json();
    expect(hotel.id).toBe(id);
  });
});
