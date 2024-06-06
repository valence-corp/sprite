"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headersWithTransaction = exports.testAuth = exports.variables = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * Contains all the variables that used for testing
 */
exports.variables = {
    databaseName: 'Test',
    user: 'Test',
    username: process.env.ARCADE_TEST_DB_USERNAME || 'root',
    password: process.env.ARCADE_TEST_DB_PASSWORD || 'playwithdata',
    address: process.env.ARCADE_TEST_DB_ADDRESS || 'http://localhost:2480',
    jsonResponse: { result: 'test' },
    jsonResponseArray: { result: ['test'] },
    nonEmptyString: 'non-empty string',
    sessionId: 'AS-0000000-0000-0000-0000-00000000000',
    typeName: 'aType',
    bucketName: 'aBucket',
    rid: '#0:0',
    jsonData: {
        aKey: 'aValue',
    },
    propertyName: 'aProperty',
    indexDescriptor: {
        type: 'aType',
        key: 'aKey',
        value: 'aValue',
    },
};
/**
 * The encoded username and password used for testing.
 */
exports.testAuth = Buffer.from(`${exports.variables.username}:${exports.variables.password}`).toString('base64');
exports.headersWithTransaction = {
    'Authorization': `Basic ${exports.testAuth}`,
    'Content-Type': 'application/json',
    'arcadedb-session-id': exports.variables.sessionId,
};
//# sourceMappingURL=variables.js.map