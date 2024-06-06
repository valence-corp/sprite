"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpriteTransaction_js_1 = require("../../../src/SpriteTransaction.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("../database/client/testClient.js");
describe('SpriteTransaction.commit()', () => {
    it('should send the provided sessionId to SpriteDatabase.commitTransaction()', async () => {
        jest
            .spyOn(testClient_js_1.client, 'commitTransaction')
            .mockImplementationOnce(async (sessionId) => {
            return true;
        });
        const transaction = new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.client, variables_js_1.variables.sessionId);
        await transaction.commit();
        expect(testClient_js_1.client.commitTransaction).toHaveBeenCalledWith(variables_js_1.variables.sessionId);
    });
    it('should update the committed status)', async () => {
        jest
            .spyOn(testClient_js_1.client, 'commitTransaction')
            .mockImplementationOnce(async (sessionId) => {
            return true;
        });
        const transaction = new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.client, variables_js_1.variables.sessionId);
        await transaction.commit();
        expect(transaction.committed).toBe(true);
    });
});
//# sourceMappingURL=commit.test.js.map