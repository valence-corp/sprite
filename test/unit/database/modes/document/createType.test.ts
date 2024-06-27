import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';
import { ArcadeCommandResponse } from '../../../../../src/types/database.js';
import { testTransaction } from '../../client/testClient.js';

const typeName = 'aDocument';

describe('DocumentModality.createType()', () => {
  it(`correctly passes all options to TypedOperations._createType`, async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockImplementationOnce(
        async (): Promise<ArcadeCommandResponse<unknown>> => {
          return {
            user: variables.username,
            serverName: '',
            version: '',
            result: [{ typeName }]
          };
        }
      );

    // Act
    await client.createType(typeName, testTransaction, {
      buckets: [variables.bucketName, variables.bucketName],
      totalBuckets: 2,
      extends: 'anotherDocument',
      ifNotExists: true
    });

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `CREATE document TYPE ${typeName} IF NOT EXISTS EXTENDS anotherDocument BUCKET ${variables.bucketName},${variables.bucketName} BUCKETS 2`,
      testTransaction
    );
  });
});
