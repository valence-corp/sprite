"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const DocumentModality_js_1 = require("../../../../src/modes/DocumentModality.js");
describe('SpriteDatabase.documents()', () => {
    it(`should return an instance of DocumentModality`, async () => {
        expect(testClient_js_1.client.documents()).toBeInstanceOf(DocumentModality_js_1.DocumentModality);
    });
});
//# sourceMappingURL=documents.test.js.map