"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
const testClient_js_2 = require("../client/testClient.js");
const typeName = 'aDocument';
const SpriteDatabase = testClient_js_1.client.database;
const dropTypeResult = {
    serverName: '',
    version: '',
    user: variables_js_1.variables.username,
    result: [],
};
describe('TypedOperations.dropType()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => dropTypeResult,
        });
        // Act
        await testClient_js_1.client.dropType(typeName, testClient_js_2.testTransaction);
        // Assert
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: variables_js_1.headersWithTransaction,
            body: JSON.stringify({
                language: 'sql',
                command: `DROP TYPE ${typeName}`,
            }),
        });
    });
    it('should properly handle "ifExists" option by appending "IF EXISTS" to the command when passed "true"', async () => {
        // Arrange
        jest.spyOn(SpriteDatabase, 'command').mockResolvedValueOnce(dropTypeResult);
        // Act
        await testClient_js_1.client.dropType(typeName, testClient_js_2.testTransaction, {
            ifExists: true,
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `DROP TYPE ${typeName} IF EXISTS`, testClient_js_2.testTransaction);
    });
    it('should properly handle "unsafe" option by appending "UNSAFE" to the command when passed "true"', async () => {
        // Arrange
        jest.spyOn(SpriteDatabase, 'command').mockResolvedValueOnce(dropTypeResult);
        // Act
        await testClient_js_1.client.dropType(typeName, testClient_js_2.testTransaction, {
            unsafe: true,
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `DROP TYPE ${typeName} UNSAFE`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=dropType.test.js.map