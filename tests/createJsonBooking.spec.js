import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Create New Booking With Post Call', async ({ request }) => {
    
    const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;
    expect(bookingBaseUrl).toBeTruthy();

    const booking = JSON.parse(
        fs.readFileSync('./testData/booking.json', 'utf8')
    );

    const response = await request.post(`${bookingBaseUrl}/booking`, {
        data: booking
    });

    // Validate response
    expect(response.status()).toBe(200);

    const responseJson = await response.json();

    // Validate booking ID
    expect(responseJson.bookingid).toBeDefined();
    expect(responseJson.bookingid).toBeGreaterThan(0);

    // Validate booking data
    expect(responseJson.booking).toBeDefined();

    // Validate individual fields
    expect(responseJson.booking.firstname).toBe(booking.firstname);
    expect(responseJson.booking.lastname).toBe(booking.lastname);
    expect(responseJson.booking.depositpaid).toBe(booking.depositpaid);
    expect(responseJson.booking.bookingdates.checkin).toBe(booking.bookingdates.checkin);
    expect(responseJson.booking.bookingdates.checkout).toBe(booking.bookingdates.checkout);    

});