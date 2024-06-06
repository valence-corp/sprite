"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const testClient_js_1 = require("./utilities/testClient.js");
const variables_js_1 = require("../../variables.js");
describe('SpriteBase.fetch()', () => {
    it('should make a properly formatted fetch request with supplied options', async () => {
        // Arrange
        const endpoint = `${variables_js_1.variables.address}${server_js_1.endpoints.ready}`;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
        };
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response());
        // Act
        await testClient_js_1.client.fetch(server_js_1.endpoints.ready, options);
        // Assert
        expect(fetch).toHaveBeenCalledWith(endpoint, options);
    });
    // Many of the methods in the Sprite class use a general test to verify that
    // they return the result of the fetch request. The thing that make this different
    // is that most of the other methods use restJson, which is wrapper around this function
    // that automatically returns the .json() of the response. This method does not do that.
    // (The reasoning for that is that we need to have a general fetch method that can return
    // a raw response for checking the status code, etc.)
    // So this test is a little different from the others, in that we need to repeat some
    // of the test code to verify that the result of the fetch request is returned.
    it('should return the result of the request', async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        const result = await testClient_js_1.client
            .fetch(variables_js_1.variables.nonEmptyString)
            .then((response) => response.json());
        expect(result).toBe(variables_js_1.variables.jsonResponse);
    });
    it('should throw an error for a 403 response', async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 403,
            json: async () => ({
                result: 'test',
            }),
        });
        await expect(testClient_js_1.client.fetch(server_js_1.endpoints.ready)).rejects.toMatchSnapshot();
    });
    it('should throw an error for a 404 response', async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 404,
            json: async () => ({
                result: 'test',
            }),
        });
        await expect(testClient_js_1.client.fetch(server_js_1.endpoints.ready)).rejects.toMatchSnapshot();
    });
    it('should forward a 500 response to the calling method', async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 500,
            json: async () => ({
                result: 'test',
            }),
        });
        await expect(testClient_js_1.client.fetch(server_js_1.endpoints.ready)).resolves.toMatchSnapshot();
    });
    it('should forward an unexpected response to the calling method', async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 999,
            json: async () => ({
                result: 'test',
            }),
        });
        await expect(testClient_js_1.client.fetch(server_js_1.endpoints.ready)).resolves.toMatchSnapshot();
    });
});
//# sourceMappingURL=fetch.test.js.map