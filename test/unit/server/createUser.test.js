"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./testClient.js");
describe('SpriteServer.createUser()', () => {
    it(`should make a properly formatted POST request to ${server_js_1.endpoints.command}`, async () => {
        // Arrange
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${variables_js_1.testAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: `CREATE USER ${JSON.stringify({
                    // ArcadeDB expects 'name' to be a property
                    // Sprite uses 'username' as a convention
                    // this is why there is a difference between
                    // input and what the method sends to the server
                    name: variables_js_1.variables.username,
                    password: variables_js_1.variables.password,
                    databases: {
                        myDatabase: 'user',
                    },
                })}`,
            }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => variables_js_1.variables.jsonResponse,
        });
        // Act
        await testClient_js_1.client.createUser({
            // See above comment for explanation on discrepancy
            // between input and output of createUser method in
            // regard to the username vs name property
            username: variables_js_1.variables.username,
            password: variables_js_1.variables.password,
            databases: {
                myDatabase: 'user',
            },
        });
        // Assert
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.command}`, options);
    });
    it('should throw an error if no "username" is supplied', async () => {
        // Act
        expect(() => 
        // @ts-expect-error
        testClient_js_1.client.createDatabase({
            password: 'myPassword',
            databases: {
                myDatabase: 'admin',
            },
        })).rejects.toMatchSnapshot();
    });
    it('should throw an error if no "password" is supplied', async () => {
        // Act
        expect(() => 
        // @ts-expect-error
        testClient_js_1.client.createDatabase({
            username: 'myUsername',
            databases: {
                myDatabase: 'admin',
            },
        })).rejects.toMatchSnapshot();
    });
    it('should throw an error if no "databases" property is supplied', async () => {
        // Act
        expect(() => 
        // @ts-expect-error
        testClient_js_1.client.createDatabase({
            username: 'myUsername',
            password: 'myPassword',
        })).rejects.toMatchSnapshot();
    });
});
//# sourceMappingURL=createUser.test.js.map