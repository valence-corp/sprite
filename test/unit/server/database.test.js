"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpriteDatabase_js_1 = require("../../../src/SpriteDatabase.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.database()', () => {
    it('should return an instance of SpriteDatabase', async () => {
        const database = testClient_js_1.client.database(variables_js_1.variables.databaseName);
        // Assert
        expect(database).toBeInstanceOf(SpriteDatabase_js_1.SpriteDatabase);
    });
});
//# sourceMappingURL=database.test.js.map