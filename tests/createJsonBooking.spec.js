import { test, expect } from '@playwright/test';

const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;

test('Create New Booking With Post Call', async ({ request }) => {
    await request.post(`${bookingBaseUrl}/booking`, {
        headers: {
            "Content-Type": "application/json"
        },
        // data:  
    });
});