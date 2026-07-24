import { test, expect } from '@playwright/test';

const API = process.env.API_BASE_URL ?? 'http://localhost:8080/api';

function uniqueEmail() {
  return `api_${Date.now()}_${Math.floor(Math.random() * 1000)}@test.com`;
}

test.describe('API - Auth', () => {
  test('POST /auth/register @smoke @regression', async ({ request }) => {
    const email = uniqueEmail();
    const payload = { email, password: 'Password@123', role: 'USER', name: 'API User' };

    const res = await request.post(${API}/auth/register, { data: payload });
    expect(res.ok()).toBeTruthy();

    const body = await res.json().catch(() => ({}));
    expect(JSON.stringify(body)).toMatch(/success|registered|user|email/i);
  });

  test('POST /auth/login returns JWT @smoke @regression', async ({ request }) => {
    const email = process.env.E2E_USER_EMAIL || 'test@test.com';
    const password = process.env.E2E_USER_PASSWORD || 'password';

    const res = await request.post(`${API}/auth/login`, { data: { email, password } });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
  });
});
