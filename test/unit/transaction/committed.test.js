"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpriteTransaction_js_1 = require("../../../src/SpriteTransaction.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("../database/client/testClient.js");
describe('SpriteTransaction.committed', () => {
    it('should store the committed status)', async () => {
        const transaction = new SpriteTransaction_js_1.SpriteTransaction(testClient_js_1.client, variables_js_1.variables.sessionId);
        expect(transaction.committed).toBe(false);
    });
});
//# sourceMappingURL=committed.test.js.map