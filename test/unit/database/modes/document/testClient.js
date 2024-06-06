"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.dbClient = void 0;
const testClient_js_1 = require("../../client/testClient.js");
Object.defineProperty(exports, "dbClient", { enumerable: true, get: function () { return testClient_js_1.client; } });
const client = testClient_js_1.client.documents();
exports.client = client;
//# sourceMappingURL=testClient.js.map