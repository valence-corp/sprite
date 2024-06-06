"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testClient_js_1 = require("./testClient.js");
const database_js_1 = require("../../../../src/endpoints/database.js");
const variables_js_1 = require("../../../variables.js");
const typeName = 'aDocument';
const SpriteDatabase = testClient_js_1.client.database;
describe('TypedOperations.selectFrom()', () => {
    it(`should make a properly formatted POST request to ${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            status: 200,
            json: async () => ({ result: [{ count: 1 }] }),
        });
        await testClient_js_1.client.selectFrom('aDocument', {
            where: ['@rid', '=', variables_js_1.variables.rid],
        });
        expect(global.fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${database_js_1.endpoints.query}/${variables_js_1.variables.databaseName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: 'sql',
                command: `SELECT FROM ${typeName} WHERE @rid = '${variables_js_1.variables.rid}'`,
            }),
        });
    });
    it('handles "skip" option by appending SKIP 10 to the command when skip is set to 10', async () => {
        jest
            .spyOn(SpriteDatabase, 'query')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.selectFrom('aDocument', {
            skip: 10,
            where: ['aProperty', '!!', 'ok'],
        });
        expect(SpriteDatabase.query).toHaveBeenCalledWith('sql', `SELECT FROM aDocument WHERE aProperty !! 'ok' SKIP 10`);
    });
    it('handles "limit" option by appending LIMIT 10 to the command when limit is set to 10', async () => {
        jest
            .spyOn(SpriteDatabase, 'query')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.selectFrom('aDocument', {
            limit: 10,
            where: ['aProperty', '!!', 'ok'],
        });
        expect(SpriteDatabase.query).toHaveBeenCalledWith('sql', `SELECT FROM aDocument WHERE aProperty !! 'ok' LIMIT 10`);
    });
    it('handles "timeout" option by appending TIMEOUT 1000 EXCEPTION to the command when timeout.duration is set to 1000 and timeout.strategy is set to EXCEPTION', async () => {
        jest
            .spyOn(SpriteDatabase, 'query')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.selectFrom('aDocument', {
            timeout: {
                duration: 1000,
                strategy: 'EXCEPTION',
            },
            where: ['aProperty', '!!', 'ok'],
        });
        expect(SpriteDatabase.query).toHaveBeenCalledWith('sql', `SELECT FROM aDocument WHERE aProperty !! 'ok' TIMEOUT 1000 EXCEPTION`);
    });
    it('handles "orderBy" option by appending ORDER BY aProperty ASC to the command when orderBy.field is set to "aProperty". amd orderBy.direction is set to "ASC"', async () => {
        jest
            .spyOn(SpriteDatabase, 'query')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.selectFrom('aDocument', {
            orderBy: {
                field: 'aProperty',
                direction: 'ASC',
            },
            where: ['aProperty', '!!', 'ok'],
        });
        expect(SpriteDatabase.query).toHaveBeenCalledWith('sql', `SELECT FROM aDocument WHERE aProperty !! 'ok' ORDER BY aProperty ASC`);
    });
    it('handles "where" option by appending "WHERE @rid = #0:0" to the command when where is set to ["@rid", "=", "#0:0"]', async () => {
        jest
            .spyOn(SpriteDatabase, 'query')
            .mockImplementationOnce(() => ({ result: [{ count: 0 }] }));
        await testClient_js_1.client.selectFrom('aDocument', {
            where: ['@rid', '=', variables_js_1.variables.rid],
        });
        expect(SpriteDatabase.query).toHaveBeenCalledWith('sql', `SELECT FROM aDocument WHERE @rid = '${variables_js_1.variables.rid}'`);
    });
});
//# sourceMappingURL=selectFrom.test.js.map