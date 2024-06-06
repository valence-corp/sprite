"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const GraphModality_js_1 = require("../../../../src/modes/GraphModality.js");
describe('SpriteDatabase.graph()', () => {
    it(`should return an instance of GraphModality`, async () => {
        expect(testClient_js_1.client.graph()).toBeInstanceOf(GraphModality_js_1.GraphModality);
    });
});
//# sourceMappingURL=graph.test.js.map