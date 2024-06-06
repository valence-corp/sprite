"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpriteRestClient_js_1 = require("../../../src/SpriteRestClient.js");
const server_js_1 = require("../../../src/endpoints/server.js");
const variables_js_1 = require("../../variables.js");
const testClient_js_1 = require("./utilities/testClient.js");
// TODO: These tests are kind of a skeleton for browser / node.
// I'm guessing how to test this in the browser / deno from a
// nodejs environment.
describe('SpriteBase.encodeCredentials()', () => {
    const credentialString = `${variables_js_1.variables.username}:${variables_js_1.variables.password}`;
    it('should properly encode the credentials in a nodejs environment (such as those passed to this.fetch in the `Authorization` header)', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response());
        jest.spyOn(Buffer, 'from');
        testClient_js_1.client.encodeCredentials(variables_js_1.variables.username, variables_js_1.variables.password);
        expect(Buffer.from).toHaveBeenCalledWith(credentialString, 'utf-8');
    });
    it('should properly encode the credentials in a browser/deno environment (such as those passed to this.fetch in the `Authorization` header)', async () => {
        const originalWindow = global.window;
        global.window = {
            btoa: jest.fn((input) => Buffer.from(input, 'utf-8').toString('base64')),
        };
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response());
        // We create a new `SpriteBase` instance with the `address`, `username`, and `password`
        // to test that the credentials are being encoded when client is created. Typically
        // tests just use the variable `testClient`, but in this case we need a new instance.
        const client = new SpriteRestClient_js_1.SpriteRestClient({
            address: variables_js_1.variables.address,
            username: variables_js_1.variables.username,
            password: variables_js_1.variables.password,
        });
        await client.fetch(server_js_1.endpoints.ready);
        // The encodeCredentials method is written so that it uses `btoa`
        // if it's available on the window object (Browser and Deno), and
        // falls back to `Buffer.from` if it's not. We expect `btoa` is
        // called in this test because we've set it on the window object.
        expect(global.window.btoa).toHaveBeenCalledWith(credentialString);
        expect(fetch).toHaveBeenCalledWith(`${variables_js_1.variables.address}${server_js_1.endpoints.ready}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(credentialString, 'utf-8').toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
        global.window = originalWindow;
    });
    it('should throw an error if no password is provided', async () => {
        expect(() => 
        // @ts-expect-error - We're testing the error thrown when the password is not provided
        new SpriteBase({
            username: variables_js_1.variables.username,
            address: variables_js_1.variables.address,
        })).toThrowErrorMatchingSnapshot();
    });
    it('should throw an error if no username is provided', async () => {
        expect(() => 
        // @ts-expect-error - We're testing the error thrown when the username is not provided
        new SpriteBase({
            password: variables_js_1.variables.password,
            address: variables_js_1.variables.address,
        })).toThrowErrorMatchingSnapshot();
    });
});
//# sourceMappingURL=encodeCredentials.test.js.map