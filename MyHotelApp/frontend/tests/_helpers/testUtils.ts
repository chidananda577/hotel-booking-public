import { request as pwRequest, APIRequestContext, expect } from '@playwright/test';

export function uniqueEmail(prefix: string) {
  const ts = Date.now();
  return `${prefix}.${ts}@example.com`;
}

export async function apiContext(): Promise<APIRequestContext> {
  const apiBaseURL = process.env.API_BASE_URL || 'http://localhost:8080/api';
  return await pwRequest.newContext({
    baseURL: apiBaseURL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
}

export async function registerUser(api: APIRequestContext, payload: any) {
  const res = await api.post('/auth/register', { data: payload });
  expect([200, 201]).toContain(res.status());
  return res;
}

export async function loginUser(api: APIRequestContext, email: string, password: string) {
  const res = await api.post('/auth/login', { data: { email, password } });
  expect(res.status()).toBe(200);
  const body = await res.json();

  const token = body.token || body.accessToken || body.jwt;
  expect(token, `Login response did not include token. Response: ${JSON.stringify(body)}`)).toBeTruthy();
  return { token, body };
}
