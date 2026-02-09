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

    const token = responseJson;
    
    console.log(token);
});