"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.openDatabase()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `OPEN DATABASE ${variables_js_1.variables.databaseName}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({
                result: 'ok'
            }),
        });
        // Act
        await testClient_js_1.client.openDatabase(variables_js_1.variables.databaseName);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should throw an error if no "databaseName" is supplied', async () => {
        // Act
        // @ts-expect-error
        expect(() => testClient_js_1.client.openDatabase()).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=openDatabase.test.js.map