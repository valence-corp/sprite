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

describe('SqlDialect.deleteFrom()', () => {
  it(`should delete a record`, async () => {
    // Arrange

    const [record] = await dbClient.query<Flavour & RecordMeta>(
      'sql',
      `SELECT * FROM ${typeName} LIMIT 1`
    );

    const trxTest = await dbClient.newTransaction();

    // Act
    await testClient.deleteFrom<VertexWithMeta, 'Flavour', '@rid'>(
      typeName,
      trxTest,
      {
        where: ['@rid', '==', record['@rid']]
      }
    );

    await trxTest.commit();

    // Assert
    await expect(
      dbClient.query(
        'sql',
        `SELECT * FROM ${typeName} WHERE @rid == ${record['@rid']}`
      )
    ).resolves.toHaveLength(0);
  });

  it(`should propagate errors from the database`, async () => {
    const trxError = await dbClient.newTransaction();
    // Assert
    await expect(
      // @ts-expect-error - testing the error
      testClient.deleteFrom('INVALID_TYPE', trxError, {
        where: ['@rid', '==', 'invalid']
      })
    ).rejects.toMatchSnapshot();
  });
});
