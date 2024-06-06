"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.dropDatabase()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `DROP DATABASE ${variables_js_1.variables.databaseName}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.dropDatabase(variables_js_1.variables.databaseName);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should throw an error if no "databaseName" is supplied', async () => {
        // Act
        // @ts-ignore
        expect(() => testClient_js_1.client.dropDatabase()).rejects.toMatchSnapshot();
    });
    it('should throw an error if "databaseName" is an empty string', async () => {
        // Act
        // @ts-ignore
        expect(() => testClient_js_1.client.dropDatabase('')).rejects.toMatchSnapshot();
    });
    it('should throw an error if "databaseName" is a string containing only whitespace', async () => {
        // Act
        // @ts-ignore
        expect(() => testClient_js_1.client.dropDatabase('   ')).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "databaseName" is a number', async () => {
        // Act
        // @ts-ignore
        expect(() => testClient_js_1.client.dropDatabase(9)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=dropDatabase.test.js.map