import { test, expect } from '@playwright/test';

test('Test GET API', async ({ request }) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    const responseJson = await response.json();

    const resStatus = response.status();

    console.log(responseJson);
    console.log(resStatus);
});