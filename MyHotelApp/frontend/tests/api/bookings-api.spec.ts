import { test, expect } from '@playwright/test';

const API = process.env.API_BASE_URL ?? 'http://localhost:8080/api';

async function loginAndGetToken(request: any) {
  const email = process.env.E2E_USER_EMAIL || 'test@test.com';
  const password = process.env.E2E_USER_PASSWORD || 'password';

  const res = await request.post(`${API}/auth/login`, { data: { email, password } });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.token).toBeTruthy();
  return body.token as string;
}

function plusDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

test.describe('API - Bookings', () => {
  test('POST /bookings, GET /bookings, DELETE /bookings/{id} @smoke @regression', async ({ request }) => {
    const token = await loginAndGetToken(request);

    const hotelsRes = await request.get(`${API}/hotels`);
    expect(hotelsRes.ok()).toBeTruthy();
    const hotels = await hotelsRes.json();
    if (!hotels.length) test.skip('No hotels available to book');

    const hotelId = hotels[0].id;
    const createPayload = {
      hotelId,
      checkInDate: plusDaysISO(15),
      checkOutDate: plusDaysISO(17),
      guests: 2
    };

    const createRes = await request.post(`${API}/bookings`, {
      data: createPayload,
      headers: { Authorization: `Bearer ${token}`}
    });
    expect(createRes.ok()).toBeTruthy();
    const created = await createRes.json();
    expect(created.id).toBeTruthy();

    const listRes = await request.get(`${API}/bookings`, { headers: { Authorization: `Bearer ${token}` } });
    expect(listRes.ok()).toBeTruthy();
    const bookings = await listRes.json();
    expect(Array.isArray(bookings)).toBeTruthy();

    const delRes = await request.delete(`${API}/bookings/${created.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(delRes.ok()).toBeTruthy();
  });

  test('GET /bookings unauthorized without token @regression', async ({ request }) => {
    const res = await request.get(`${API}/bookings`);
    expect([401, 403]).toContain(res.status());
  });
});
