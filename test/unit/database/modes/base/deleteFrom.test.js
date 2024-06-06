"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const testClient_js_2 = require("../../client/testClient.js");
const typeName = 'aDocument';
describe('ModalityBase.deleteFrom()', () => {
    it(`correctly passes all options to TypedOperations._deleteFrom`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'command')
            .mockImplementationOnce(async (lanugage, options) => {
            return {
                user: variables_js_1.variables.username,
                serverName: '',
                version: '',
                result: [{ count: 1 }],
            };
        });
        await testClient_js_1.client.deleteFrom(typeName, testClient_js_2.testTransaction, {
            where: ['@rid', '!!', variables_js_1.variables.rid],
            limit: 1,
            return: 'BEFORE',
            timeout: 10000,
        });
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `DELETE FROM ${typeName} RETURN BEFORE WHERE @rid !! '${variables_js_1.variables.rid}' LIMIT 1 TIMEOUT 10000`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=deleteFrom.test.js.map