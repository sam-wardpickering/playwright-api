import { test, expect } from '@playwright/test';

test('Testing dotenv works', async ({ page }) => {
    await page.goto('/');

    expect(page).toHaveURL(/the-internet/);
});