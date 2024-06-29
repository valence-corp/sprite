import { ArcadeSupportedQueryLanguages } from '../../../src/types/database.js';
import { testClient as client } from './testClient.js';

describe('SpriteDatabase.command', () => {

  it('executes a command successfully', async () => {
    const command = 'CREATE document TYPE aType';
    const language: ArcadeSupportedQueryLanguages = 'sql';
    const result = await client.command(language, command);

    expect(result).toEqual([
      { operation: 'create document type', typeName: 'aType' }
    ]);
  });

  it('propagates errors from ArcadeDB', async () => {
    const command = 'INVALID COMMAND';
    const language = 'INVALID_LANGUAGE';
    await expect(
      // @ts-expect-error - Testing invalid input
      client.command(language, command)
    ).rejects.toMatchSnapshot();
  });
});