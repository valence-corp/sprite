import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';

describe('ModalityBase.selectOne()', () => {
  it(`correctly passes all arguments and options to TypedOperations.selectOne`, async () => {
    jest
      .spyOn(SpriteDatabase, 'query')
      .mockImplementationOnce(async (rid: string) => {
        return {
          result: [
            {
              '@rid': variables.rid,
              '@cat': 'd',
              '@type': 'aDocument',
              'aProperty': 'aValue',
            },
          ],
          serverName: '',
          version: '',
          user: '',
        };
      });

    await client.selectOne(variables.rid);

    expect(SpriteDatabase.query).toHaveBeenCalledWith(
      `sql`,
      `SELECT FROM ${variables.rid}`,
    );
  });
  it('returns the record from the query result', async () => {
    jest
      .spyOn(SpriteDatabase, 'query')
      .mockImplementationOnce(async (rid: string) => {
        return {
          result: [
            {
              '@rid': variables.rid,
              '@cat': 'd',
              '@type': 'aDocument',
              'aProperty': 'aValue',
            },
          ],
          serverName: '',
          version: '',
          user: '',
        };
      });

    const result = await client.selectOne(variables.rid);

    expect(result).toMatchObject({
      '@rid': variables.rid,
      '@cat': 'd',
      '@type': 'aDocument',
      'aProperty': 'aValue',
    });
  });
});
