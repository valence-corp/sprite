import { RecordMeta } from '../../../src/types/database.js';
import { testClient } from './testclient.js';

interface Flavour {
  name: string;
}

const dbClient = testClient.database;
const typeName = 'Flavour';

describe('SqlDialect.deleteOne()', () => {
  it(`should delete a record`, async () => {
    // Arrange

    const [record] = await dbClient.query<Flavour & RecordMeta>(
      'sql',
      `SELECT * FROM ${typeName} LIMIT 1`
    );

    const trx = await dbClient.newTransaction();

    // Act
    await testClient.deleteOne(record['@rid'], trx);
    await trx.commit();

    // Assert
    await expect(
      dbClient.query(
        'sql',
        `SELECT * FROM ${typeName} WHERE @rid == ${record['@rid']}`
      )
    ).resolves.toHaveLength(0);
  });

  it(`should propagate errors from the database`, async () => {
    const trx = await dbClient.newTransaction();
    // Assert
    await expect(
      testClient.deleteOne('INVALID_RID', trx)
    ).rejects.toMatchSnapshot();
  });
});
