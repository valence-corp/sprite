"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const testClient_js_2 = require("../../client/testClient.js");
const typeName = 'aVertex';
const newVertex = {
    '@rid': variables_js_1.variables.rid,
    '@cat': 'v',
    '@type': typeName,
    aProperty: 'aValue',
};
const newVertexCommandResponse = {
    user: variables_js_1.variables.username,
    serverName: '',
    version: '',
    result: [newVertex],
};
describe('GraphModality.newVertex()', () => {
    // Arrange
    beforeEach(() => {
        jest
            .spyOn(testClient_js_1.dbClient, 'command')
            .mockImplementationOnce(async (lanugage, options) => newVertexCommandResponse);
    });
    it(`correctly passes typeName, options.data, and options.transactionId to SpriteOperations._insertRecord`, async () => {
        // Act
        await testClient_js_1.client.newVertex(typeName, testClient_js_2.testTransaction, {
            data: {
                aProperty: 'aValue',
            },
        });
        // Assert
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `INSERT INTO ${typeName} CONTENT ${JSON.stringify({
            aProperty: 'aValue',
        })}`, testClient_js_2.testTransaction);
    });
    it(`correctly passes handles options.bucket`, async () => {
        // Act
        await testClient_js_1.client.newVertex(typeName, testClient_js_2.testTransaction, {
            bucket: variables_js_1.variables.bucketName,
        });
        // Asserts
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `INSERT INTO BUCKET:${variables_js_1.variables.bucketName}`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=newVertex.test.js.map