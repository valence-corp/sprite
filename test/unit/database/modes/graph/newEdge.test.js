"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const testClient_js_2 = require("../../client/testClient.js");
const typeName = 'anEdge';
const newEdge = {
    '@rid': variables_js_1.variables.rid,
    '@cat': 'e',
    '@type': typeName,
    '@in': variables_js_1.variables.rid,
    '@out': variables_js_1.variables.rid,
    'aProperty': 'aValue',
};
const newEdgeCommandResponse = {
    user: variables_js_1.variables.username,
    serverName: '',
    version: '',
    result: [newEdge],
};
describe('GraphModality.newEdge()', () => {
    // Arrange
    beforeEach(() => {
        jest
            .spyOn(testClient_js_1.dbClient, 'command')
            .mockImplementationOnce(async (lanugage, options) => newEdgeCommandResponse);
    });
    it(`correctly passes typeName, to, from, options.data, and options.transactionId to SpriteOperations._createEdge`, async () => {
        // Act
        await testClient_js_1.client.newEdge(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            data: {
                aProperty: 'aValue',
            },
        });
        // Assert
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `CREATE EDGE ${typeName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid} CONTENT ${JSON.stringify({
            aProperty: 'aValue',
        })}`, testClient_js_2.testTransaction);
    });
    it(`correctly passes handles options.bucket`, async () => {
        //Act
        await testClient_js_1.client.newEdge(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            bucket: variables_js_1.variables.bucketName,
        });
        // Assert
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `CREATE EDGE ${typeName} BUCKET ${variables_js_1.variables.bucketName} FROM ${variables_js_1.variables.rid} TO ${variables_js_1.variables.rid}`, testClient_js_2.testTransaction);
    });
    it('should return the newly created edge', async () => {
        // Act
        const record = await testClient_js_1.client.newEdge(typeName, variables_js_1.variables.rid, variables_js_1.variables.rid, testClient_js_2.testTransaction, {
            data: {
                aProperty: 'aValue',
            },
        });
        // Assert
        expect(record).toMatchObject(newEdge);
    });
});
//# sourceMappingURL=newEdge.test.js.map