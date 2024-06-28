import { ArcadeGetSchemaResponse } from '@root/src/api.js';
import { testClient as client } from './testClient.js';

let schema: ArcadeGetSchemaResponse[];

beforeAll(async () => {
  schema = await client.getSchema();
});

describe('SpriteDatabase.getSchema', () => {
  it('returns the schema of the database as an array', () => {
    expect(Array.isArray(schema)).toBe(true);
  });

  it('matches the schema snapshot', () => {
    expect(schema).toMatchSnapshot();
  });
});
