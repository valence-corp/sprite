"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const ChainingModality_js_1 = require("../../../../src/modes/ChainingModality.js");
describe('SpriteDatabase.chain()', () => {
    it(`should return an instance of ChainingModality`, async () => {
        expect(testClient_js_1.client.chain()).toBeInstanceOf(ChainingModality_js_1.ChainingModality);
    });
});
//# sourceMappingURL=chain.test.js.map