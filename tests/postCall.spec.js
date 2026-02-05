import { test, expect } from '@playwright/test';

test('Post call example with token', async ({ request }) => {
    const authData = {
        "username" : "admin",
        "password" : "password123"
    }

    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: {
            "Content-Type": "application/json"
        },
        data: authData
    })

    console.log(response.status());
    
    const responseData = await response.json();
    expect(responseData.token).not.toBeNull(); 
    
});


test.only('Post call example with BookingID', async ({ request }) => {
    const bookingData = {
        "firstname": "Jim",
        "lastname": "Morrison",
        "totalprice": 999,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-02-23",
            "checkout": "2029-10-23"
        },
        "additionalneeds": "Dinner"
    }

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            "Content-Type": "application/json"
        },
        data: bookingData
    })

    console.log(response.status());
    
    const responseData = await response.json();
    
    console.log(responseData.bookingid);
    expect(responseData.bookingid).not.toBeNull(); 

    expect(responseData.booking.firstname).toBe(bookingData.firstname);
    
    
});