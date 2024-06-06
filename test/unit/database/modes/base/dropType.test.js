"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const testClient_js_2 = require("../../client/testClient.js");
const typeName = 'aDocument';
describe('ModalityBase.dropType()', () => {
    it(`correctly passes all options to TypedOperations._dropType`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'command')
            .mockImplementationOnce(async (lanugage, options) => {
            return {
                user: variables_js_1.variables.username,
                serverName: '',
                version: '',
                result: [{ typeName }],
            };
        });
        await testClient_js_1.client.dropType(typeName, testClient_js_2.testTransaction, {
            ifExists: true,
            unsafe: true,
        });
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `DROP TYPE ${typeName} UNSAFE IF EXISTS`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=dropType.test.js.map