"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
describe('SpriteDatabase.query()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        await testClient_js_1.client.query('gremlin', variables_js_1.variables.nonEmptyString);
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
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
        const result = await testClient_js_1.client.query('gremlin', variables_js_1.variables.nonEmptyString);
        expect(result).toMatchSnapshot();
    });
    it('should handle a 400 response by throwing an error', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 400,
        });
        await expect(testClient_js_1.client.query('sql', variables_js_1.variables.nonEmptyString)).rejects.toMatchSnapshot();
    });
    it('should handle a 500 response by throwing an error', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 500,
        });
        await expect(testClient_js_1.client.query('gremlin', variables_js_1.variables.nonEmptyString)).rejects.toMatchSnapshot();
    });
    it('should handle an unexpected status code by throwing an error', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 418,
            statusText: variables_js_1.variables.nonEmptyString,
        });
        await expect(testClient_js_1.client.query('gremlin', variables_js_1.variables.nonEmptyString)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=query.test.js.map