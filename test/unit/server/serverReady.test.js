"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testPropagateErrors_js_1 = require("../helpers/testPropagateErrors.js");
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
/**
 * Test suit for the Sprite.ready() method.
 * It tests the following:
 * 1. Makes a properly formatted `GET` request to `/api/v1/ready`
 * 2. Returns `true` if the server returns a 204
 * 3. Should propegate errors from internal methods
 */
describe('SpriteBase.serverReady()', () => {
    it(`should make a properly formatted GET request to ${server_js_1.endpoints.ready}`, async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response());
        // Act
        await testClient_js_1.client.serverReady();
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.ready}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
        });
    });
    it(`should return true when the server returns a 204`, async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 204,
        });
        // Act
        const status = await testClient_js_1.client.serverReady();
        // Assert
        expect(status).toBe(true);
    });
    (0, testPropagateErrors_js_1.testPropagateErrors)(testClient_js_1.client.serverReady);
});
//# sourceMappingURL=serverReady.test.js.map