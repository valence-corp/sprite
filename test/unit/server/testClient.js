"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const variables_js_1 = require("../../variables.js");
const SpriteServer_js_1 = require("../../../src/SpriteServer.js");
exports.client = new SpriteServer_js_1.SpriteServer({
    username: process.env.ARCADE_TEST_DB_USERNAME || variables_js_1.variables.username,
    password: process.env.ARCADE_TEST_DB_PASSWORD || variables_js_1.variables.password,
    address: process.env.ARCADE_TEST_DB_ADDRESS || variables_js_1.variables.address,
});
//# sourceMappingURL=testClient.js.map