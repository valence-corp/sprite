"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
const testClient_js_2 = require("../client/testClient.js");
const typeName = 'aDocument';
const SpriteDatabase = testClient_js_1.client.database;
const data = {
    aProperty: 'aValue',
};
describe('TypedOperations.insertRecord()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => ({ result: [{ count: 1 }] }),
        });
        await testClient_js_1.client.insertRecord('aDocument', testClient_js_2.testTransaction, {
            data: {
                aProperty: 'aValue',
            },
        });
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: variables_js_1.headersWithTransaction,
            body: JSON.stringify({
                language: 'sql',
                command: `INSERT INTO ${typeName} CONTENT ${JSON.stringify({
                    aProperty: 'aValue',
                })}`,
            }),
        });
    });
    it(`handles "bucket" option by appending "BUCKET:${variables_js_1.variables.bucketName}" instead of a typename to the command when bucket is set to "${variables_js_1.variables.bucketName}"`, async () => {
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.insertRecord('aDocument', testClient_js_2.testTransaction, {
            bucket: variables_js_1.variables.bucketName,
        });
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `INSERT INTO BUCKET:${variables_js_1.variables.bucketName}`, testClient_js_2.testTransaction);
    });
    it(`handles "data" option by appending CONTENT ${JSON.stringify(data)} to the command when data is set to ${data}`, async () => {
        jest
            .spyOn(SpriteDatabase, 'command')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.insertRecord('aDocument', testClient_js_2.testTransaction, {
            data,
        });
        expect(SpriteDatabase.command).toHaveBeenCalledWith('sql', `INSERT INTO aDocument CONTENT ${JSON.stringify(data)}`, testClient_js_2.testTransaction);
    });
    // it('it properly handles a transactionId', async () => {
    //   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //     status: 200,
    //     json: async () => ({ result: [{ count: 1 }] }),
    //   } as Response);
    //   await client._insertRecord<DocumentTypes, TypeName>('aDocument',  {
    //     transactionId: variables.sessionId,
    //   });
    //   expect(global.fetch).toHaveBeenCalledWith(
    //     `${variables.address}${endpoints.command}/${variables.databaseName}`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Basic ${testAuth}`,
    //         'Content-Type': 'application/json',
    //         'arcadedb-session-id': variables.sessionId,
    //       },
    //       body: JSON.stringify({
    //         language: 'sql',
    //         command: `INSERT INTO ${typeName}`,
    //       }),
    //     },
    //   );
    // });
});
//# sourceMappingURL=insertRecord.test.js.map