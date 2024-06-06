"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variables_js_1 = require("../../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteDatabase.name accessor', () => {
    it(`should return the database name`, async () => {
        expect(testClient_js_1.client.name).toBe(variables_js_1.variables.databaseName);
    });
});
//# sourceMappingURL=name.test.js.map