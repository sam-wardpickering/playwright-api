import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Create New Booking With Post Call', async ({ request }) => {

    const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;
    expect(bookingBaseUrl).toBeTruthy();

    const booking = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '../testData/booking.json'), 'utf8')
    );

    const response = await request.post(`${bookingBaseUrl}/booking`, {
        data: booking
    });

    // Validate response
    expect([200, 201]).toContain(response.status());

    const responseJson = await response.json();

    // Validate booking ID
    expect(responseJson.bookingid).toBeDefined();
    expect(responseJson.bookingid).toBeGreaterThan(0);

    // Validate booking data
    expect(responseJson.booking).toBeDefined();
    expect(responseJson.booking).toMatchObject(booking);

});