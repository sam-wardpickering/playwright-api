import { test, expect } from '@playwright/test';


test('Put Example', async ({ request }) => {

    const postData = {
        "username" : "admin",
        "password" : "password123"
    };

    const response = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json",
        },
        data: postData

    });

    const responseJson = await response.json();

    const token = responseJson.token;
    
    console.log("Your token is: " +token);

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

    const newBookingResJson = await newBookingResponse.json();

    const bookingID = newBookingResJson.bookingid;

    console.log("New booking ID is: " +bookingID);
});