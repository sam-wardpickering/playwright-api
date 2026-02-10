import { test, expect } from '@playwright/test';

test('Put Request Example', async ({ request }) => {

    // Create token

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

    expect(response.ok()).toBeTruthy();

    const { token } = await response.json();

    // Create new booking

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

    expect(newBookingResponse.ok()).toBeTruthy();

    const newBookingResJson = await newBookingResponse.json();

    const bookingID = newBookingResJson.bookingid;

    // Update booking

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

    // Verify status ok
    expect(updatedBooking.ok()).toBeTruthy();

    const updatedBookingResJson = await updatedBooking.json();

    // Verify firstname and lastname updated
    expect(updatedBookingResJson.firstname).toBe(updateBookingData.firstname);
    expect(updatedBookingResJson.lastname).toBe(updateBookingData.lastname);

});