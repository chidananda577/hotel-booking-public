# Hotel Booking Frontend - Playwright Tests

This folder contains a Playwright test framework (UI E2E) for the Hotel Booking app.

## Prerequisites
- Node.js 18+
- Frontend running locally (by default) at `http://localhost:5173`
- Backend running locally (by default) at `http://localhost:8080`

## Configuration (Env)
The Playwright config reads these variables:

- `BASE_URL`: UI base url (default: `http://localhost:5173`)
- `API_BASE_URL`: API base url (default: `http://localhost:8080/api`)

## Install

From ``MyHotelApp/frontend` :

```bash
nmp install
npx playwright install
```

## Run Tests

- All Playwright tests:
  ```bash
  npm run test:pw
  ```

- Smoke suite:
  ```bash
  npm run test:pw:smoke
  ```

- E2E only:
  ``bash
  npm run test:pw:e2e
  ```

## Reports

Open the HTML report:

```bash
npm run pw:report
```

## Selector stability

The tests prefer data-testid attributes. If you see flakyness, consider adding `data-testid` to key ui elements (login form, hotel cards, booking form, booking rows, cancel button, etc.).
