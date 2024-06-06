"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const testClient_js_2 = require("../../client/testClient.js");
const typeName = 'aVertex';
describe('GraphModality.createVertexType()', () => {
    it(`correctly passes all options to SpriteOperations._createType`, async () => {
        // Arrange
        jest
            .spyOn(testClient_js_1.dbClient, 'command')
            .mockImplementationOnce(async (lanugage, options) => {
            return {
                user: variables_js_1.variables.username,
                serverName: '',
                version: '',
                result: [{ typeName }],
            };
        });
        // Act
        await testClient_js_1.client.createVertexType(typeName, testClient_js_2.testTransaction, {
            buckets: [variables_js_1.variables.bucketName, variables_js_1.variables.bucketName],
            totalBuckets: 2,
            extends: 'anotherVertex',
            ifNotExists: true,
        });
        // Assert
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `CREATE vertex TYPE ${typeName} IF NOT EXISTS EXTENDS anotherVertex BUCKET ${variables_js_1.variables.bucketName},${variables_js_1.variables.bucketName} BUCKETS 2`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=createVertexType.test.js.map