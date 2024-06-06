"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const SpriteRestClient_1 = require("../../../../src/SpriteRestClient");
const variables_1 = require("../../../variables");
exports.client = new SpriteRestClient_1.SpriteRestClient({
    address: variables_1.variables.address,
    username: variables_1.variables.username,
    password: variables_1.variables.password,
});
//# sourceMappingURL=testClient.js.map