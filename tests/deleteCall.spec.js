import { test, expect } from '@playwright/test';

test('Put Request Example', async ({ request }) => {

    const jsonHeaders = {
        'Content-Type': 'application/json'
    };

    const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;

    // Check base url
    expect(bookingBaseUrl).toBeTruthy();
    expect(bookingBaseUrl).toMatch(/^https?:\/\//);

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
    expect(bookingID).toBeGreaterThan(0);

    const deleteResponse = await request.delete(`${bookingBaseUrl}/booking/${bookingID}`, {
        ...jsonHeaders,
        "Cookie": `token=${token}`
    });

    expect(deleteResponse.ok()).toBeTruthy();

});