"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpriteDatabase_js_1 = require("../../../src/SpriteDatabase.js");
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.createDatabase()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `CREATE DATABASE ${variables_js_1.variables.databaseName}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({ result: 'ok' }),
        });
        // Act
        await testClient_js_1.client.createDatabase(variables_js_1.variables.databaseName);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should return an instance of SpriteDatabase with the created database as a target.', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({ result: 'ok' }),
        });
        expect(await testClient_js_1.client.createDatabase(variables_js_1.variables.databaseName)).toBeInstanceOf(SpriteDatabase_js_1.SpriteDatabase);
    });
    it('should throw an error if no "databaseName" is supplied', async () => {
        // Act
        // @ts-expect-error
        expect(() => testClient_js_1.client.createDatabase()).rejects.toMatchSnapshot();
    });
    it('should throw an error if "databaseName" is an empty string', async () => {
        // Act
        expect(() => testClient_js_1.client.createDatabase('')).rejects.toMatchSnapshot();
    });
    it('should throw an error if "databaseName" is a string containing only whitespace', async () => {
        // Act
        expect(() => testClient_js_1.client.createDatabase('   ')).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "databaseName" is a number', async () => {
        // Act
        // @ts-expect-error
        expect(() => testClient_js_1.client.createDatabase(9)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=createDatabase.test.js.map