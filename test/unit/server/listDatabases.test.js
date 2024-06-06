"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.listDatabases()', () => {
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
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.listDatabases();
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.databases}`, options);
    });
    it('should return the result for a 200 status', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        const response = await testClient_js_1.client.listDatabases();
        expect(response).toBe(variables_js_1.variables.jsonResponse.result);
    });
    it('should return an error for a 403 status', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 403,
        });
        expect(() => testClient_js_1.client.listDatabases()).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=listDatabases.test.js.map