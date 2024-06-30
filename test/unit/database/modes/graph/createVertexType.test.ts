import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';
import { ArcadeCommandResponse } from '../../../../../src/types/database.js';

const typeName = 'aVertex';

describe('GraphModality.createVertexType()', () => {
  it(`correctly passes all options to SpriteOperations._createType`, async () => {
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
    await client.createVertexType(typeName, {
      buckets: [variables.bucketName, variables.bucketName],
      totalBuckets: 2,
      extends: 'anotherVertex',
      ifNotExists: true
    });

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `CREATE vertex TYPE ${typeName} IF NOT EXISTS EXTENDS anotherVertex BUCKET ${variables.bucketName},${variables.bucketName} BUCKETS 2`
    );
  });
});
