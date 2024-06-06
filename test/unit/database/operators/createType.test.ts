import { client } from './testClient.js';
import { endpoints } from '../../../../src/endpoints/database.js';
import {
  variables,
  headersWithTransaction as headers,
} from '../../../variables.js';
import { SpriteType } from '../../../../src/SpriteType.js';

import { DocumentTypes } from '../types.js';
import { SpriteTransaction } from '../../../../src/SpriteTransaction.js';

const recordType = 'document';
const typeName = 'aDocument';
const SpriteDatabase = client.database;
type TypeName = typeof typeName;

const testTransaction = new SpriteTransaction(
  client.database,
  variables.sessionId,
);

const createTypeResult = {
  user: variables.username,
  serverName: '',
  version: '',
  result: [{ typeName }],
};

describe('TypedOperations.createType()', () => {
  it(`makes a properly formatted POST request to ${endpoints.command}/${variables.databaseName}`, async () => {
    // Arrange
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: async () => createTypeResult,
    } as Response);

    // Act
    await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
    );
    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.command}/${variables.databaseName}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          language: 'sql',
          command: `CREATE document TYPE ${typeName}`,
        }),
      },
    );
  });

  it('it returns an instance of SpriteType when it receives a a JSON object with a result property from the server.', async () => {
    // TODO: This seems confusing.
    // reasoning for this is because the if it's passed a
    // 'ifNotExists' option, it won't throw an error, and
    // the user might be expecting a 'type' to perform
    // operations on, so we return the type even if
    // it was previously created.

    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockResolvedValueOnce(createTypeResult);

    // Act
    const result = await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
      {
        buckets: variables.bucketName,
      },
    );
    // Assert
    expect(result).toBeInstanceOf(SpriteType);
  });

  it('handles "buckets" option by appending "BUCKET" + [bucketName] to the command when passed a string bucketName property.', async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockResolvedValueOnce(createTypeResult);

    // Act
    await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
      {
        buckets: variables.bucketName,
      },
    );

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      'sql',
      `CREATE document TYPE ${typeName} BUCKET ${variables.bucketName}`,
      testTransaction,
    );
  });

  it('handles "buckets" option by appending "BUCKET" + [bucketNames] to the command when passed an array of strings as the bucketName property.', async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockResolvedValueOnce(createTypeResult);

    // Act
    await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
      {
        buckets: [variables.bucketName, variables.bucketName],
      },
    );

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      'sql',
      `CREATE document TYPE ${typeName} BUCKET ${[
        variables.bucketName,
        variables.bucketName,
      ].join(',')}`,
      testTransaction,
    );
  });

  it('handles "ifNotExists" option by appending "IF NOT EXISTS" to the command when passed "false"', async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockResolvedValueOnce(createTypeResult);

    // Act
    await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
      {
        ifNotExists: true,
      },
    );

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      'sql',
      `CREATE document TYPE ${typeName} IF NOT EXISTS`,
      testTransaction,
    );
  });

  it('handles "extends" option by appending "EXTENDS" + [typeName] to the command when passed an extends property', async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockResolvedValueOnce(createTypeResult);

    // Act
    await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
      {
        extends: 'anotherDocument',
      },
    );

    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      'sql',
      `CREATE document TYPE ${typeName} EXTENDS anotherDocument`,
      testTransaction,
    );
  });

  it('handles "totalBuckets" option by appending "BUCKETS" + [totalBuckets] to the command when passed a totalBuckets property', async () => {
    // Arrange
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockResolvedValueOnce(createTypeResult);

    // Act
    await client.createType<DocumentTypes, TypeName>(
      typeName,
      recordType,
      testTransaction,
      {
        totalBuckets: 4,
      },
    );
    // Assert
    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      'sql',
      `CREATE document TYPE ${typeName} BUCKETS 4`,
      testTransaction,
    );
  });

  it('should throw an error if it receives an empty string for parameters', async () => {
    //@ts-expect-error
    await expect(client.createType('')).rejects.toMatchSnapshot();
  });

  it('should throw an error if it receives no arguments', async () => {
    //@ts-expect-error
    await expect(client.createType()).rejects.toMatchSnapshot();
  });
});
