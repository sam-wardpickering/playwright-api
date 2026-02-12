import { test, expect } from '@playwright/test';
import fs from 'fs';

const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;

test('Create New Booking With Post Call', async ({ request }) => {

    const bookingFile = fs.readFileSync("./testData/booking.json");

    await request.post(`${bookingBaseUrl}/booking`, {
        headers: {
            "Content-Type": "application/json"
        },
        // data:  
    });
});