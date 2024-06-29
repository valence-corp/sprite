import { DropArgument } from 'net';
import { testClient } from './testclient.js';

interface DocumentTypes {
  TestType: {
    aProperty: string;
  };
  INVALID_TYPE: {};
}

const typeName = 'TestType';
const dbClient = testClient.database;

describe('SqlDialect.dropType()', () => {
  it(`should drop a type`, async () => {
    await testClient.createType<DocumentTypes, 'TestType'>(
      typeName,
      'document'
    );

    // Assert
    await expect(
      dbClient.query('sql', `SELECT FROM ${typeName}`)
    ).resolves.toHaveLength(0);

    await testClient.dropType<DocumentTypes, 'TestType'>(typeName);

    // Assert
    await expect(
      dbClient.query('sql', `SELECT FROM ${typeName}`)
    ).rejects.toMatchSnapshot();
  });

  it(`should propagate errors from the database`, async () => {
    // Assert
    await expect(
      testClient.dropType<DocumentTypes, 'INVALID_TYPE'>('INVALID_TYPE')
    ).rejects.toMatchSnapshot();
  });
});
