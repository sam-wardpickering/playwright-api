import { test, expect } from '@playwright/test';

test('Put Request Example', async ({ request }) => {

    /* Create token */

    // Check credentials
    expect(process.env.TOKEN_USERNAME).toBeTruthy();
    expect(process.env.TOKEN_PASSWORD).toBeTruthy();

    const postData = {
        "username" : process.env.TOKEN_USERNAME,
        "password" : process.env.TOKEN_PASSWORD
    };

    const response = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json",
        },
        data: postData

    });

    // Check request was successful
    expect(response.ok()).toBeTruthy();

    const { token } = await response.json();

    // Check token
    expect(token).toBeTruthy();

    /* Create new booking */

    const newBookingData = {
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

    const newBookingResponse = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Content-Type": "application/json"
        },
        data: newBookingData
    });

    // Check request was successful
    expect(newBookingResponse.ok()).toBeTruthy();

    const newBookingResJson = await newBookingResponse.json();

    const bookingID = newBookingResJson.bookingid;

    // Check booking ID
    expect(bookingID).toBeTruthy();

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
    }

    const updatedBooking = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: updateBookingData
    });

    // Check request was successful
    expect(updatedBooking.ok()).toBeTruthy();

    const updatedBookingResJson = await updatedBooking.json();

    // Verify firstname and lastname updated
    expect(updatedBookingResJson.firstname).toBe(updateBookingData.firstname);
    expect(updatedBookingResJson.lastname).toBe(updateBookingData.lastname);

});