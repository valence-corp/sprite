import { CreateDocumentType } from '../../../src/types/commandResponse.js';
import { ArcadeSupportedQueryLanguages } from '../../../src/types/database.js';
import { testClient as client } from './testClient.js';

describe('SpriteDatabase.command', () => {
  it('executes a command successfully', async () => {
    const language: ArcadeSupportedQueryLanguages = 'sql';
    const command: string = 'CREATE document TYPE aType';
    const result = await client.command<CreateDocumentType<'aType'>>(
      language,
      command
    );

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
