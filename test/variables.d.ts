/**
 * Contains all the variables that used for testing
 */
export declare const variables: {
    readonly databaseName: "Test";
    readonly user: "Test";
    readonly username: string;
    readonly password: string;
    readonly address: string;
    readonly jsonResponse: {
        readonly result: "test";
    };
    readonly jsonResponseArray: {
        readonly result: readonly ["test"];
    };
    readonly nonEmptyString: "non-empty string";
    readonly sessionId: "AS-0000000-0000-0000-0000-00000000000";
    readonly typeName: "aType";
    readonly bucketName: "aBucket";
    readonly rid: "#0:0";
    readonly jsonData: {
        readonly aKey: "aValue";
    };
    readonly propertyName: "aProperty";
    readonly indexDescriptor: {
        readonly type: "aType";
        readonly key: "aKey";
        readonly value: "aValue";
    };
};
/**
 * The encoded username and password used for testing.
 */
export declare const testAuth: string;
export declare const headersWithTransaction: {
    Authorization: string;
    'Content-Type': string;
    'arcadedb-session-id': "AS-0000000-0000-0000-0000-00000000000";
};
