"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const SpriteTransaction_js_1 = require("../../../../../src/SpriteTransaction.js");
describe('ModalityBase.transaction()', () => {
    beforeEach(() => {
        jest
            .spyOn(testClient_js_1.dbClient, 'commitTransaction')
            .mockImplementationOnce(async (id) => {
            return true;
        });
    });
    it(`correctly passes isolationLevel argument to SpriteDatabase.newTransaction`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'newTransaction')
            .mockImplementationOnce(async () => {
            return new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.dbClient, variables_js_1.variables.sessionId);
        });
        await testClient_js_1.client.transaction(() => { }, 'REPEATABLE_READ');
        expect(testClient_js_1.dbClient.newTransaction).toHaveBeenCalledWith('REPEATABLE_READ');
    });
    it(`correctly passes a new SpriteTransaction to the callback`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'newTransaction')
            .mockImplementationOnce(async () => {
            return new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.dbClient, variables_js_1.variables.sessionId);
        });
        let transaction = undefined;
        await testClient_js_1.client.transaction((trx) => {
            transaction = trx;
        });
        expect(transaction).toBeInstanceOf(SpriteTransaction_js_1.SpriteTransaction);
    });
    it(`correctly commits the transaction before returning`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'newTransaction')
            .mockImplementationOnce(async () => {
            return new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.dbClient, variables_js_1.variables.sessionId);
        });
        const transaction = await testClient_js_1.client.transaction((trx) => { });
        expect(transaction.committed).toBe(true);
    });
    it(`it executes the callback once`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'newTransaction')
            .mockImplementationOnce(async () => {
            return new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.dbClient, variables_js_1.variables.sessionId);
        });
        let count = 0;
        const transaction = await testClient_js_1.client.transaction((trx) => {
            ++count;
        });
        expect(count).toBe(1);
    });
});
//# sourceMappingURL=transaction.test.js.map