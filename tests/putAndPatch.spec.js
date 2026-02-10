import { test, expect } from '@playwright/test';

test('Put Request Example', async ({ request }) => {

    const jsonHeaders = {
        'Content-Type': 'application/json'
    };

    const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;
    expect(bookingBaseUrl).toBeDefined();

    /* Create token */

    // Check credentials
    const username = process.env.BOOKING_API_TOKEN_USERNAME;
    const password = process.env.BOOKING_API_TOKEN_PASSWORD;

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    const postData = {
        "username" : username,
        "password" : password
    };

    const authResponse = await request.post(`${bookingBaseUrl}/auth`, {
        headers: jsonHeaders,
        data: postData

    });

    // Check request was successful
    expect(authResponse.ok()).toBeTruthy();

    const { token } = await authResponse.json();

    // Check token
    expect(token).toBeTruthy();

    /* Create new booking */

    const bookingData = {
        "firstname": "Sam",
        "lastname": "Ward",
        "totalprice": 333,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-02-10",
            "checkout": "2026-02-14"
        },
        "additionalneeds": "Gaming PC"
    };

    const bookingResponse = await request.post(`${bookingBaseUrl}/booking`, {
        headers: jsonHeaders,
        data: bookingData
    });

    // Check request was successful
    expect(bookingResponse.ok()).toBeTruthy();

    const bookingJson = await bookingResponse.json();

    // Check booking
    expect(bookingJson.booking).toBeTruthy();

    expect(bookingJson.booking.firstname).toBe(bookingData.firstname);
    expect(bookingJson.booking.lastname).toBe(bookingData.lastname);
    expect(bookingJson.booking.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);

    const bookingID = bookingJson.bookingid;

    // Check booking ID
    expect(bookingID).toBeDefined();

    // Check booking ID type
    expect(typeof bookingID).toBe('number');

    /* Update booking */

    const updateBookingData = {
        "firstname": "Samuel",
        "lastname": "Ward-Pickering",
        "totalprice": 333,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-02-10",
            "checkout": "2026-02-15"
        },
        "additionalneeds": "Gaming PC"
    };

    const updateResponse = await request.put(`${bookingBaseUrl}/booking/${bookingID}`, {
        headers: {
            ...jsonHeaders,
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: updateBookingData
    });

    // Check request was successful
    expect(updateResponse.ok()).toBeTruthy();

    const updateJson = await updateResponse.json();

    // Verify firstname and lastname updated
    expect(updateJson.firstname).toBe(updateBookingData.firstname);
    expect(updateJson.lastname).toBe(updateBookingData.lastname);
    expect(updateJson.bookingdates.checkout).toBe(updateBookingData.bookingdates.checkout);

});