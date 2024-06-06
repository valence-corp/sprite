"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
describe('SpriteDatabase.command()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        await testClient_js_1.client.command('gremlin', variables_js_1.variables.nonEmptyString, testClient_js_1.testTransaction);
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.command}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: variables_js_1.headersWithTransaction,
            body: JSON.stringify({
                language: 'gremlin',
                command: variables_js_1.variables.nonEmptyString,
            }),
        });
    });
    it('should handle a 200 response by returning the data from the response', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        const result = await testClient_js_1.client.command('gremlin', variables_js_1.variables.nonEmptyString, testClient_js_1.testTransaction);
        expect(result).toMatchSnapshot();
    });
    it('should handle a 400 response by throwing an error', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 400,
        });
        await expect(
        // @ts-expect-error invalid language, invalid query
        testClient_js_1.client.command('invalid', variables_js_1.variables.nonEmptyString)).rejects.toMatchSnapshot();
    });
    it('should handle a 500 response by throwing an error', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 500,
            json: async () => ({
                error: 'Internal error',
                detail: `Database \u0027${variables_js_1.variables.databaseName}\u0027 is not available`,
                exception: 'com.arcadedb.exception.DatabaseOperationException',
            }),
        });
        await expect(testClient_js_1.client.command('gremlin', variables_js_1.variables.nonEmptyString, testClient_js_1.testTransaction)).rejects.toMatchSnapshot();
    });
    it('should handle an unexpected status code by throwing an error', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 999,
            statusText: variables_js_1.variables.nonEmptyString,
        });
        await expect(testClient_js_1.client.command('gremlin', variables_js_1.variables.nonEmptyString, testClient_js_1.testTransaction)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=command.test.js.map