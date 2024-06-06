"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.dbClient = void 0;
const testClient_1 = require("../../client/testClient");
Object.defineProperty(exports, "dbClient", { enumerable: true, get: function () { return testClient_1.client; } });
const client = testClient_1.client.graph();
exports.client = client;
//# sourceMappingURL=testClient.js.map