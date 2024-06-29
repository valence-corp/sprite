import { ArcadeSupportedQueryLanguages } from '../../../src/types/database.js';
import { testClient as client } from './testClient.js';

describe('SpriteDatabase.query', () => {
  it('executes a query successfully', async () => {
    const command = 'SELECT FROM schema:types';
    const language: ArcadeSupportedQueryLanguages = 'sql';
    const result = await client.query(language, command);

    expect(result).toMatchSnapshot();
  });

  it('propagates errors from ArcadeDB', async () => {
    const command = 'INVALID COMMAND';
    const language = 'INVALID_LANGUAGE';
    await expect(
      // @ts-expect-error - Testing invalid input
      client.query(language, command)
    ).rejects.toMatchSnapshot();
  });
});
