"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.closeDatabase()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `CLOSE DATABASE ${variables_js_1.variables.databaseName}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({ result: 'ok' }),
        });
        // Act
        await testClient_js_1.client.closeDatabase(variables_js_1.variables.databaseName);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should throw an error if no "databaseName" is supplied', async () => {
        // Act
        // @ts-expect-error
        expect(() => testClient_js_1.client.closeDatabase()).rejects.toMatchSnapshot();
    });
    // it('should throw an error if "databaseName" is an empty string', async () => {
    //   // Act
    //   expect(() => client.closeDatabase('')).rejects.toMatchSnapshot();
    // });
    // it('should throw an error if "databaseName" is a string containing only whitespace', async () => {
    //   // Act
    //   expect(() => client.closeDatabase('   ')).rejects.toMatchSnapshot();
    // });
    // it('should throw an error if supplied "databaseName" is a number', async () => {
    //   // Act
    //   expect(() => client.createDatabase(9)).rejects.toMatchSnapshot();
    // });
    it('should throw an error if supplied "databaseName" is an object', async () => {
        // Act
        expect(() => testClient_js_1.client.createDatabase('')).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "databaseName" is boolean', async () => {
        // Act
        // @ts-expect-error
        expect(() => testClient_js_1.client.createDatabase(false)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=closeDatabase.test.js.map