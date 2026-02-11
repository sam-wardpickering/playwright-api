import { test, expect } from '@playwright/test';

test('Check API Health', async ({ request }) => {
    const pingResponse = await request.get("https://restful-booker.herokuapp.com/ping");
});