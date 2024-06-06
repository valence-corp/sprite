"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const SpriteTransaction_js_1 = require("../../../../../src/SpriteTransaction.js");
describe('ModalityBase.newTransaction()', () => {
    it(`correctly passes all options to SpriteDatabase.newTransaction`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'newTransaction')
            .mockImplementationOnce(async () => {
            return new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.dbClient, variables_js_1.variables.sessionId);
        });
        await testClient_js_1.client.newTransaction('REPEATABLE_READ');
        expect(testClient_js_1.dbClient.newTransaction).toHaveBeenCalledWith('REPEATABLE_READ');
    });
    it(`returns an instance of SpriteTransaction`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'newTransaction')
            .mockImplementationOnce(async () => {
            return new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.dbClient, variables_js_1.variables.sessionId);
        });
        const trx = await testClient_js_1.client.newTransaction('REPEATABLE_READ');
        expect(trx).toBeInstanceOf(SpriteTransaction_js_1.SpriteTransaction);
    });
});
//# sourceMappingURL=newTransaction.test.js.map