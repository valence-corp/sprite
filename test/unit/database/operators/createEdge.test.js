"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
const testClient_js_2 = require("../client/testClient.js");
const vertexName = 'aVertex';
const propertyName = 'aProperty';
const typeName = 'anEdge';
const SpriteDatabase = testClient_js_1.client.database;
const data = {
    aProperty: 'aValue',
};
const stringifiedData = JSON.stringify(data);
const indexDescriptor = {
    type: 'aVertex',
    key: 'aProperty',
    value: 'aValue',
};
const indexSelectStatement = `(SELECT FROM ${vertexName} WHERE ${propertyName} = 'aValue')`;
const createEdgeTyped = (testClient_js_1.client.createEdge);
const createEdgeResult = {
    user: variables_js_1.variables.username,
    version: '',
    serverName: '',
    result: [{ count: 0 }],
};
describe('TypedOperations.insertRecord()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, async () => {
        // Arrange
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => createEdgeResult,
        });
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            data,
        });
        // Assert
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: variables_js_1.headersWithTransaction,
            body: JSON.stringify({
                language: 'sql',
                command: `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid} CONTENT ${stringifiedData}`,
            }),
        });
    });
    it(`handles string rids in the to and from fields by appending TO ${variables_js_1.variables.rid} FROM ${variables_js_1.variables.rid} to the command when supplied with ${variables_js_1.variables.rid} in the TO and FROM fields`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction);
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid}`, testClient_js_2.testTransaction);
    });
    it(`handles index descriptor objects in the TO and FROM arguments option by appending TO ${indexSelectStatement} FROM ${indexSelectStatement} to the command when an index descriptor object is supplied"`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, indexDescriptor, indexDescriptor, testClient_js_2.testTransaction);
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} FROM ${indexSelectStatement} TO ${indexSelectStatement}`, testClient_js_2.testTransaction);
    });
    it(`handles "data" option by appending CONTENT ${stringifiedData} to the command when data is set to ${data}`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, { data });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid} CONTENT ${stringifiedData}`, testClient_js_2.testTransaction);
    });
    it(`handles "upsert" option by appending "UPSERT" to the command when upsert is set to true`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            upsert: true,
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} UPSERT FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid}`, testClient_js_2.testTransaction);
    });
    it(`handles "unidirectional" option by appending "UNIDIRECTIONAL" to the command when unidirectional is set to true`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            unidirectional: true,
        });
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid} UNIDIRECTIONAL`, testClient_js_2.testTransaction);
    });
    it(`handles "retry" option by appending "RETRY 4 WAIT 1000" to the command when retry.attempts is set to 4 and retry.wait is set to 1000`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            retry: { attempts: 4, wait: 1000 },
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid} RETRY 4 WAIT 1000`, testClient_js_2.testTransaction);
    });
    it(`handles "batchSize" option by appending "BATCH 1000" to the command when batchSize is set to 1000`, async () => {
        // Arrange
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(async () => createEdgeResult);
        // Act
        await createEdgeTyped(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            batchSize: 1000,
        });
        // Assert
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid} BATCH 1000`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=createEdge.test.js.map