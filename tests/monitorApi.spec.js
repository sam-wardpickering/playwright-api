import { test, expect } from '@playwright/test';

test('Check API Health', async ({ request }) => {
    const pingResponse = await request.get("https://restful-booker.herokuapp.com/ping");

    const pingStatus = pingResponse.status();

    console.log(`Response code from API is ${pingStatus}`);
});