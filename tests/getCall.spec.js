import { test, expect } from '@playwright/test';

test('Test GET API', async ({ request }) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    const responseJson = await response.json();
    const resStatus = response.status();
    const resStatusTxt = response.statusText();
    const resHeaders = response.headers();
    const resHeadersArray = response.headersArray();

    // console.log(responseJson);
    // console.log(resStatus);
    // console.log(resStatusTxt);
    // console.log(resHeaders);
    // console.log(resHeadersArray);

    expect(resStatus).toBe(200);
    expect(resStatus).not.toBe(201);
    expect(resStatusTxt).toContain("OK");

    expect(response.ok()).toBeTruthy();

    expect(responseJson).toHaveProperty("userId", 1);
});