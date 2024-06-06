"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const testClient_js_1 = require("./utilities/testClient.js");
const variables_js_1 = require("../../variables.js");
const testPropagateErrors_js_1 = require("../helpers/testPropagateErrors.js");
describe('SpriteBase.fetchJson()', () => {
    it('should make a properly formatted fetch request with supplied options', async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: 'non-empty string' }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.fetchJson(server_js_1.endpoints.command, options);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    // I believe that if the fetchJson method is being used that it should always return the
    // "result" property from the object that the fetch method returns. This simplifies
    // the code for higher level methods.
    it('should return the result property of the response json object', async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValue({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        const result = await testClient_js_1.client.fetchJson(server_js_1.endpoints.command);
        expect(result).toBe(variables_js_1.variables.jsonResponse.result);
    });
    it(`should throw an ArcadeDatabaseError when it receives an object with an error property`, async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => ({
                error: 'test',
                detail: 'test details',
            }),
        });
        // Act & Assert
        expect(testClient_js_1.client.fetchJson(server_js_1.endpoints.command)).rejects.toMatchSnapshot();
    });
    (0, testPropagateErrors_js_1.testPropagateErrors)(testClient_js_1.client.fetchJson, server_js_1.endpoints.command);
});
//# sourceMappingURL=fetchJson.test.js.map