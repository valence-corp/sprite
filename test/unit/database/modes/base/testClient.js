"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.dbClient = void 0;
const ModalityBase_js_1 = require("../../../../../src/modes/ModalityBase.js");
const testClient_1 = require("../../client/testClient");
Object.defineProperty(exports, "dbClient", { enumerable: true, get: function () { return testClient_1.client; } });
const testClient_js_1 = require("../../operators/testClient.js");
const client = new ModalityBase_js_1.ModalityBase(testClient_1.client, testClient_js_1.client);
exports.client = client;
//# sourceMappingURL=testClient.js.map