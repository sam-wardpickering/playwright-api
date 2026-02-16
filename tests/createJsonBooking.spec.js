import { test, expect } from '@playwright/test';
import fs from 'fs';

const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;

test('Create New Booking With Post Call', async ({ request }) => {

    const bookingFile = fs.readFileSync("./testData/booking.json");

    const booking = JSON.parse(bookingFile);

    const response = await request.post(`${bookingBaseUrl}/booking`, {
        headers: {
            "Content-Type": "application/json"
        },
        data: booking
    });

    expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();

    expect(responseJson.bookingid).toBeDefined();
    expect(responseJson.bookingid).toBeGreaterThan(0);

    expect(responseJson.booking.firstname).toBe(booking.firstname);
    expect(responseJson.booking.lastname).toBe(booking.lastname);
    expect(responseJson.booking.depositpaid).toBe(booking.depositpaid);
    expect(responseJson.booking.bookingdates.checkin).toBe(booking.bookingdates.checkin);
    expect(responseJson.booking.bookingdates.checkout).toBe(booking.bookingdates.checkout);    

});