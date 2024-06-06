"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.databaseExists()', () => {
    it('should make a properly formatted fetch request with supplied options', async () => {
        // Arrange
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
        });
        // Act
        await testClient_js_1.client.databaseExists(variables_js_1.variables.databaseName);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.exists}/${variables_js_1.variables.databaseName}`, options);
    });
    it('should return a boolean "true" for a 200 status response from the server', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        const response = await testClient_js_1.client.databaseExists(variables_js_1.variables.databaseName);
        expect(response).toBe(true);
    });
    it('should return a boolean "false" for a 400 status response from the server', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 400,
        });
        const response = await testClient_js_1.client.databaseExists(variables_js_1.variables.databaseName);
        expect(response).toBe(false);
    });
});
//# sourceMappingURL=databaseExists.test.js.map