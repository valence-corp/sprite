"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
const testClient_js_2 = require("../client/testClient.js");
const typeName = 'aDocument';
const SpriteDatabase = testClient_js_1.client.database;
const deleteOneResult = {
    user: variables_js_1.variables.username,
    serverName: '',
    version: '',
    result: [{ count: 1 }],
};
describe('SpriteOperations.deleteOne()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => deleteOneResult,
        });
        // Act
        await testClient_js_1.client.deleteFrom(typeName, testClient_js_2.testTransaction, {
            where: [variables_js_1.variables.propertyName, '=', variables_js_1.variables.rid],
        });
        // Assert
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: variables_js_1.headersWithTransaction,
            body: JSON.stringify({
                language: 'sql',
                command: `DELETE FROM ${typeName} WHERE ${variables_js_1.variables.propertyName} = '${variables_js_1.variables.rid}'`,
            }),
        });
    });
    it('handles "timeout" option by appending TIMEOUT 1000 to the command when timeout is set to 1000', async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockResolvedValueOnce(deleteOneResult);
        // Act
        await testClient_js_1.client.deleteFrom(typeName, testClient_js_2.testTransaction, {
            timeout: 1000,
            where: [variables_js_1.variables.propertyName, '!!', 'ok'],
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `DELETE FROM ${typeName} WHERE ${variables_js_1.variables.propertyName} !! 'ok' TIMEOUT 1000`, testClient_js_2.testTransaction);
    });
    it('handles "return" option by appending RETURN BEFORE to the command when return is set to before', async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockResolvedValueOnce(deleteOneResult);
        // Act
        await testClient_js_1.client.deleteFrom(typeName, testClient_js_2.testTransaction, {
            return: 'BEFORE',
            where: [variables_js_1.variables.propertyName, '!!', 'ok'],
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `DELETE FROM ${typeName} RETURN BEFORE WHERE ${variables_js_1.variables.propertyName} !! 'ok'`, testClient_js_2.testTransaction);
    });
    it('handles "limit" option by appending LIMIT 10 to the command when limit is set to 10', async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockResolvedValueOnce(deleteOneResult);
        // Act
        await testClient_js_1.client.deleteFrom(typeName, testClient_js_2.testTransaction, {
            limit: 10,
            where: [variables_js_1.variables.propertyName, '!!', 'ok'],
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `DELETE FROM ${typeName} WHERE ${variables_js_1.variables.propertyName} !! 'ok' LIMIT 10`, testClient_js_2.testTransaction);
    });
    it('handles "where" option by appending "WHERE @rid = #0:0" to the command when where is set to ["@rid", "=", "#0:0"]', async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockResolvedValueOnce(deleteOneResult);
        // Act
        await testClient_js_1.client.deleteFrom(typeName, testClient_js_2.testTransaction, {
            where: [variables_js_1.variables.propertyName, '=', variables_js_1.variables.rid],
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `DELETE FROM ${typeName} WHERE ${variables_js_1.variables.propertyName} = '${variables_js_1.variables.rid}'`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=deleteFrom.test.js.map