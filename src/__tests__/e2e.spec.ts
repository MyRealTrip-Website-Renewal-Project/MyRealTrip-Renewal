import { test, expect } from '@playwright/test';

test('기본 E2E 테스트', async ({ page }) => {
  await page.goto('http://localhost:5173');
  expect(await page.title()).toBeDefined();
}); 