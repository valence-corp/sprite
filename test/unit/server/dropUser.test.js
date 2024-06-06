"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.dropUser()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `DROP USER ${variables_js_1.variables.username}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.dropUser(variables_js_1.variables.username);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should throw an error if no "username" is supplied', async () => {
        // Act
        // @ts-ignore
        expect(() => testClient_js_1.client.dropUser()).rejects.toMatchSnapshot();
    });
    it('should throw an error if "username" is an empty string', async () => {
        // Act
        expect(() => testClient_js_1.client.dropUser('')).rejects.toMatchSnapshot();
    });
    it('should throw an error if "username" is a string containing only whitespace', async () => {
        // Act
        expect(() => testClient_js_1.client.dropUser('   ')).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "username" is a number', async () => {
        // Act
        // @ts-ignore
        expect(() => testClient_js_1.client.createDatabase(9)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=dropUser.test.js.map