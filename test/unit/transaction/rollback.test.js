"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpriteTransaction_js_1 = require("../../../src/SpriteTransaction.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("../database/client/testClient.js");
describe('SpriteTransaction.rollback()', () => {
    it('should send the provided sessionId to SpriteDatabase.rollbackTransaction()', async () => {
        jest
            .spyOn(testClient_js_1.client, 'rollbackTransaction')
            .mockImplementationOnce(async (sessionId) => {
            return true;
        });
        const transaction = new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.client, variables_js_1.variables.sessionId);
        await transaction.rollback();
        expect(testClient_js_1.client.rollbackTransaction).toHaveBeenCalledWith(variables_js_1.variables.sessionId);
    });
});
//# sourceMappingURL=rollback.test.js.map