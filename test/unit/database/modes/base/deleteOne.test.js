"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const testClient_js_2 = require("../../client/testClient.js");
describe('ModalityBase.deleteOne()', () => {
    it(`correctly passes all options to TypedOperations._deleteOne`, async () => {
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
        await testClient_js_1.client.deleteOne(variables_js_1.variables.rid, testClient_js_2.testTransaction);
        expect(testClient_js_1.dbClient.command).toHaveBeenCalledWith(`sql`, `DELETE FROM ${variables_js_1.variables.rid}`, testClient_js_2.testTransaction);
    });
});
//# sourceMappingURL=deleteOne.test.js.map