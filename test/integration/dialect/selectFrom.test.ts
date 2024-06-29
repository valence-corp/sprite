import { AsArcadeRecords, RecordMeta } from '../../../src/types/database.js';
import { testClient } from './testclient.js';

interface Flavour {
  name: string;
}

interface VertexTable {
  Flavour: Flavour;
}

interface VertexWithMeta extends AsArcadeRecords<VertexTable> {}

const dbClient = testClient.database;
const typeName = 'Flavour';

describe('SqlDialect.selectFrom()', () => {
  it(`should select record`, async () => {
    // Arrange

    // Act
    const records = await testClient.selectFrom<
      VertexWithMeta,
      'Flavour',
      'name'
    >(typeName, {
      where: ['name', '!=', 'undefined']
    });

    // Assert
    expect(Array.isArray(records)).toBe(true); // Ensure it's an array

    records.forEach((record) => {
      expect(record).toHaveProperty('name'); // Ensure each record has the 'name' property
      expect(record.name).not.toBe('undefined'); // Ensure 'name' is not 'undefined'
    });
  });

  it(`should propagate errors from the database`, async () => {
    const trx = await dbClient.newTransaction();
    // Assert
    await expect(
      // @ts-expect-error - testing the error
      testClient.selectFrom('INVALID_TYPE', trx, {
        where: ['@rid', '==', 'invalid']
      })
    ).rejects.toMatchSnapshot();
  });
});
