"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.connectCluster()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `CONNECT CLUSTER ${variables_js_1.variables.address}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.connectCluster(variables_js_1.variables.address);
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should throw an error if no "address" is supplied', async () => {
        // @ts-expect-error
        expect(() => testClient_js_1.client.connectCluster()).rejects.toMatchSnapshot();
    });
    it('should throw an error if "address" is an empty string', async () => {
        expect(() => testClient_js_1.client.connectCluster('')).rejects.toMatchSnapshot();
    });
    it('should throw an error if "address" is a string containing only whitespace', async () => {
        expect(() => testClient_js_1.client.connectCluster('   ')).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "address" is a number', async () => {
        // @ts-expect-error
        expect(() => testClient_js_1.client.connectCluster(9)).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "address" is an object', async () => {
        // @ts-expect-error
        expect(() => testClient_js_1.client.connectCluster({})).rejects.toMatchSnapshot();
    });
    it('should throw an error if supplied "address" is boolean', async () => {
        // @ts-expect-error
        expect(() => testClient_js_1.client.connectCluster(false)).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=connectCluster.test.js.map