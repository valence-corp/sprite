"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
describe('SpriteDatabase.explain()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => variables_js_1.variables.jsonResponse,
        });
        const toExplain = 'SELECT * FROM bucketName';
        await testClient_js_1.client.explain(toExplain);
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: 'sql',
                command: `EXPLAIN ${toExplain}`,
            }),
        });
    });
    it('should throw an error if it receives an empty string for parameters', async () => {
        const explanation = async () => testClient_js_1.client.explain('');
        expect(explanation).rejects.toMatchSnapshot();
    });
    it('should throw an error if it receives a string of whitespace for parameters', async () => {
        const explanation = async () => testClient_js_1.client.explain('   ');
        expect(explanation).rejects.toMatchSnapshot();
    });
    it('should throw an error if it receives no parameters', async () => {
        // @ts-expect-error
        const explanation = async () => testClient.explain();
        expect(explanation).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=explain.test.js.map