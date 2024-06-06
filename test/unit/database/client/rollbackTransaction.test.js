"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
describe('SpriteDatabase.rollbackTransaction()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.rollbackTransaction}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 204,
        });
        await testClient_js_1.client.rollbackTransaction(variables_js_1.variables.sessionId);
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.rollbackTransaction}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
                'arcadedb-session-id': variables_js_1.variables.sessionId,
            },
        });
    });
});
//# sourceMappingURL=rollbackTransaction.test.js.map