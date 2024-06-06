"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
const typeName = 'aDocument';
describe('ModalityBase.selectFrom()', () => {
    it(`correctly passes all options to TypedOperations._selectFrom`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'query')
            .mockImplementationOnce(async (lanugage, options) => {
            return {
                user: variables_js_1.variables.username,
                serverName: '',
                version: '',
                result: [],
            };
        });
        await testClient_js_1.client.selectFrom(typeName, {
            where: ['@rid', '!!', variables_js_1.variables.rid],
            limit: 1,
            timeout: {
                duration: 10000,
                strategy: 'RETURN',
            },
            orderBy: {
                field: 'aProperty',
                direction: 'DESC',
            },
        });
        expect(testClient_js_1.dbClient.query).toHaveBeenCalledWith(`sql`, `SELECT FROM ${typeName} WHERE @rid !! '${variables_js_1.variables.rid}' ORDER BY aProperty DESC LIMIT 1 TIMEOUT 10000 RETURN`);
    });
});
//# sourceMappingURL=selectFrom.test.js.map