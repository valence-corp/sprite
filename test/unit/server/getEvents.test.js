"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.getEvents()', () => {
    it('should make a properly formatted fetch request with supplied options', async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: 'GET SERVER EVENTS',
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.getEvents();
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
});
//# sourceMappingURL=getEvents.test.js.map