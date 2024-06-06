"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const variables_js_1 = require("../../../../variables.js");
describe('ModalityBase.selectOne()', () => {
    it(`correctly passes all arguments and options to TypedOperations.selectOne`, async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'query')
            .mockImplementationOnce(async (rid) => {
            return {
                result: [
                    {
                        '@rid': variables_js_1.variables.rid,
                        '@cat': 'd',
                        '@type': 'aDocument',
                        'aProperty': 'aValue',
                    },
                ],
                serverName: '',
                version: '',
                user: '',
            };
        });
        await testClient_js_1.client.selectOne(variables_js_1.variables.rid);
        expect(testClient_js_1.dbClient.query).toHaveBeenCalledWith(`sql`, `SELECT FROM ${variables_js_1.variables.rid}`);
    });
    it('returns the record from the query result', async () => {
        jest
            .spyOn(testClient_js_1.dbClient, 'query')
            .mockImplementationOnce(async (rid) => {
            return {
                result: [
                    {
                        '@rid': variables_js_1.variables.rid,
                        '@cat': 'd',
                        '@type': 'aDocument',
                        'aProperty': 'aValue',
                    },
                ],
                serverName: '',
                version: '',
                user: '',
            };
        });
        const result = await testClient_js_1.client.selectOne(variables_js_1.variables.rid);
        expect(result).toMatchObject({
            '@rid': variables_js_1.variables.rid,
            '@cat': 'd',
            '@type': 'aDocument',
            'aProperty': 'aValue',
        });
    });
});
//# sourceMappingURL=selectOne.test.js.map