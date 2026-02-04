import { test, expect } from '@playwright/test';

test('Test GET API', async ({ request }) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    console.log(response);
});