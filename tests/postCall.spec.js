import { test, expect } from '@playwright/test';

test('Post call example with token and booking ID', async ({ request }) => {
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