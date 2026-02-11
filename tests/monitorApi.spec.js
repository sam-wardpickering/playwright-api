import { test, expect } from '@playwright/test';

// Playwright timeout is 30 seconds by default

test('Check API Health', async ({ request }) => {

    test.setTimeout(0);

    while(true) {

        const startTime = Date.now(); 

        const pingResponse = await request.get("https://restful-booker.herokuapp.com/ping");

        const endTime = Date.now();

        const responseDuration = endTime-startTime;
        
        

        if (responseDuration > 2000) {
            throw new Error(`API response is slow ${duration}`);
        } else {
            console.log(`Total duration of the response is ${responseDuration}`);
        }
        
        const pingStatus = pingResponse.status();

        console.log(`Response code from API is ${pingStatus}`);

        expect(pingStatus).toBe(201);
    }

});