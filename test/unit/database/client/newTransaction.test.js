"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
const SpriteTransaction_js_1 = require("../../../../src/SpriteTransaction.js");
describe('SpriteDatabase.newTransaction()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.beginTransaction}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 204,
            headers: new Headers({
                'arcadedb-session-id': variables_js_1.variables.sessionId,
            }),
        });
        await testClient_js_1.client.newTransaction();
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.beginTransaction}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: null,
        });
    });
    it(`it should pass the isolationLevel parameter to the body of the request when set to REPEATABLE_READ`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 204,
            headers: new Headers({
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
                'arcadedb-session-id': variables_js_1.variables.sessionId,
            }),
        });
        await testClient_js_1.client.newTransaction('REPEATABLE_READ');
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.beginTransaction}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isolationLevel: 'REPEATABLE_READ' }),
        });
    });
    it('should return an instance of SpriteTransaction', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 204,
            headers: new Headers({
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
                'arcadedb-session-id': variables_js_1.variables.sessionId,
            }),
        });
        const trx = await testClient_js_1.client.newTransaction();
        expect(trx).toBeInstanceOf(SpriteTransaction_js_1.SpriteTransaction);
    });
});
//# sourceMappingURL=newTransaction.test.js.map