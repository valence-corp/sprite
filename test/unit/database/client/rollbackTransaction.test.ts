import { client } from './testClient.js';
import { endpoints } from '../../../../src/endpoints/database.js';
import { variables, testAuth } from '../../../variables.js';

describe('SpriteDatabase.rollbackTransaction()', () => {
  it(`should make a properly formatted POST request to ${endpoints.rollbackTransaction}/${variables.databaseName}`, async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 204
    } as Response);
    await client.rollbackTransaction(variables.sessionId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${variables.address}${endpoints.rollbackTransaction}/${variables.databaseName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${testAuth}`,
          'Content-Type': 'application/json',
          'arcadedb-session-id': variables.sessionId
        }
      }
    );
  });
});
