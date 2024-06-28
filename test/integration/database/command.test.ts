import { SpriteDatabase } from '../../../src/SpriteDatabase.js';
import { ArcadeSupportedQueryLanguages } from '../../../src/types/database.js';
import { SpriteTransaction } from '../../../src/SpriteTransaction.js';

describe('SpriteDatabase.command', () => {
  let database: SpriteDatabase;
  let transaction: SpriteTransaction;

  beforeEach(async () => {
    database = new SpriteDatabase({
      username: 'root',
      password: '999999999',
      address: 'http://localhost:2480',
      databaseName: 'ExampleDatabase'
    });
    transaction = await database.newTransaction();
  });

  afterEach(async () => {
    console.log('Rolling back transaction');
    await transaction.rollback();
  });

  it('executes a command successfully', async () => {
    const command = 'CREATE document TYPE aType';
    const language: ArcadeSupportedQueryLanguages = 'sql';

    const response = await database.command(language, command, transaction);

    expect(response.result).toEqual([
      { operation: 'create document type', typeName: 'aType' }
    ]);
    expect(response.serverName).toEqual('ArcadeDB_0');
    expect(response.user).toEqual('root');
    expect(response.version).toBeDefined();
  });

  it('throws an error for an invalid language or command', async () => {
    const command = 'INVALID COMMAND';
    const language = 'INVALID_LANGUAGE';

    await expect(
      // @ts-expect-error
      database.command(language, command, transaction)
    ).rejects.toThrowError('Invalid language or command');
  });

  // Add more tests as needed
});
