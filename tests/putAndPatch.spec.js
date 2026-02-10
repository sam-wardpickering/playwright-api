import { test, expect } from '@playwright/test';

test('Put Request Example', async ({ request }) => {

    const jsonHeaderContentType = {
        'Content-Type': 'application/json'
    };

    const bookingBaseUrl = process.env.BOOKING_API_BASE_URL;
    expect(bookingBaseUrl).toBeTruthy();

    /* Create token */

    // Check credentials
    expect(process.env.BOOKING_API_TOKEN_USERNAME).toBeTruthy();
    expect(process.env.BOOKING_API_TOKEN_PASSWORD).toBeTruthy();

    const postData = {
        "username" : process.env.BOOKING_API_TOKEN_USERNAME,
        "password" : process.env.BOOKING_API_TOKEN_PASSWORD
    };

    const authResponse = await request.post(`${bookingBaseUrl}/auth`, {
        headers: jsonHeaderContentType,
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
        headers: jsonHeaderContentType,
        data: bookingData
    });

    // Check request was successful
    expect(bookingResponse.ok()).toBeTruthy();

    const bookingJson = await bookingResponse.json();

    // Check booking
    expect(bookingJson.booking).toBeTruthy();

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
            ...jsonHeaderContentType,
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

});