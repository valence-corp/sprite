import { SpriteDatabase } from '../../../src/SpriteDatabase.js';
import { ArcadeSupportedQueryLanguages } from '../../../src/types/database.js';
import { SpriteTransaction } from '../../../src/SpriteTransaction.js';

jest.mock('./_client', () => ({
  fetch: jest.fn()
}));

describe('SpriteDatabase.command', () => {
  let database: SpriteDatabase;
  let transaction: SpriteTransaction;
  let fetchMock: jest.Mock;

  beforeEach(async () => {
    database = new SpriteDatabase({
      username: 'aUser',
      password: 'aPassword',
      address: 'http://localhost:2480',
      databaseName: 'aDatabase'
    });
    transaction = await database.newTransaction();
    fetchMock = jest.requireMock('./_client').fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('executes a non-idempotent command successfully', async () => {
    const command = 'CREATE document TYPE aType';
    const language: ArcadeSupportedQueryLanguages = 'sql';
    const params = { foo: 'bar' };

    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: () => ({
        result: [{ operation: 'create document type', typeName: 'aType' }]
      })
    });

    const result = await database.command(language, command, transaction);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/command'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          language,
          command,
          params
        }),
        headers: {
          'arcadedb-session-id': transaction.id
        }
      })
    );

    expect(result).toEqual({
      result: [{ operation: 'create document type', typeName: 'aType' }]
    });
  });

  it('throws an error for an invalid language or command', async () => {
    const command = 'INVALID COMMAND';
    const language = 'INVALID_LANGUAGE';

    fetchMock.mockResolvedValueOnce({
      status: 400,
      json: () => ({ error: 'Invalid language or command' })
    });

    await expect(
      // @ts-expect-error invalid language
      database.command(language, command, transaction)
    ).rejects.toMatchSnapshot();
  });

  it('throws an error for a server error', async () => {
    const command = 'CREATE document TYPE aType';
    const language = 'sql';

    fetchMock.mockResolvedValueOnce({
      status: 500,
      json: () => ({ error: 'Server error' })
    });

    await expect(
      database.command(language, command, transaction)
    ).rejects.toMatchSnapshot();
  });
});
