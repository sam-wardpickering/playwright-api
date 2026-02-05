import { test, expect } from '@playwright/test';

test('Test GET API', async ({ request }) => {

    const response = await request.get(process.env.API_URL);

    // console.log(process.env.API_URL);

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

    // check json
    expect(responseJson).toHaveProperty("userId", 1);
    expect(responseJson).toHaveProperty("id", 1);
    expect(responseJson).toHaveProperty("title", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit");

});