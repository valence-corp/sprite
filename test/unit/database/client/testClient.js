"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTransaction = exports.client = void 0;
const variables_js_1 = require("../../../variables.js");
const SpriteDatabase_js_1 = require("../../../../src/SpriteDatabase.js");
const SpriteTransaction_js_1 = require("../../../../src/SpriteTransaction.js");
exports.client = new SpriteDatabase_js_1.SpriteDatabase({
    username: process.env.ARCADE_TEST_DB_USERNAME || variables_js_1.variables.username,
    password: process.env.ARCADE_TEST_DB_PASSWORD || variables_js_1.variables.password,
    address: process.env.ARCADE_TEST_DB_ADDRESS || variables_js_1.variables.address,
    databaseName: process.env.ARCADE_TEST_DB_NAME || variables_js_1.variables.databaseName,
});
exports.testTransaction = new SpriteTransaction_js_1.SpriteTransaction(exports.client, variables_js_1.variables.sessionId);
//# sourceMappingURL=testClient.js.map