import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';
import {
  ArcadeCommandResponse,
  ArcadeSupportedQueryLanguages,
} from '../../../../../src/types/database.js';
import { testTransaction } from '../../client/testClient.js';

const typeName = 'anEdge';

describe('GraphModality.createEdgeType()', () => {
  it(`correctly passes all options to SpriteOperations._createType`, async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockImplementationOnce(
        async (
          lanugage: ArcadeSupportedQueryLanguages,
          options: any,
        ): Promise<ArcadeCommandResponse<unknown>> => {
          return {
            user: variables.username,
            serverName: '',
            version: '',
            result: [{ typeName }],
          };
        },
      );

    // Act
    await client.createEdgeType(typeName, testTransaction, {
      buckets: [variables.bucketName, variables.bucketName],
      totalBuckets: 2,
      extends: 'anotherEdge',
      ifNotExists: true,
    });

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `CREATE edge TYPE ${typeName} IF NOT EXISTS EXTENDS anotherEdge BUCKET ${variables.bucketName},${variables.bucketName} BUCKETS 2`,
      testTransaction,
    );
  });
});
