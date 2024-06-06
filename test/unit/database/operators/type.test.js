"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const SpriteType_js_1 = require("../../../../src/SpriteType.js");
const typeName = 'aDocument';
describe('TypedOperations.type()', () => {
    it('should return an instance of SpriteType', async () => {
        // Act
        const type = testClient_js_1.client.type(typeName);
        // Assert
        expect(type).toBeInstanceOf(SpriteType_js_1.SpriteType);
    });
});
//# sourceMappingURL=type.test.js.map