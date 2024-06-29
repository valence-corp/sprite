import { RecordMeta } from '../../../src/types/database.js';
import { testClient } from './testclient.js';

interface Flavour {
  name: string;
}

interface VertexTable {
  Flavour: Flavour;
}

const dbClient = testClient.database;
const typeName = 'Flavour';

describe('SqlDialect.updateOne()', () => {
  it(`should update a record`, async () => {
    // Arrange

    const [originalRecord] = await dbClient.query<Flavour & RecordMeta>(
      'sql',
      `SELECT * FROM ${typeName} LIMIT 1`
    );

    const trx = await dbClient.newTransaction();

    // Act
    await testClient.updateOne<VertexTable, 'Flavour'>(
      originalRecord['@rid'],
      { name: 'Rancid' },
      trx
    );

    await trx.commit();

    const [updatedRecord] = await dbClient.query<Flavour & RecordMeta>(
      'sql',
      `SELECT * FROM ${typeName} WHERE @rid == ${originalRecord['@rid']}`
    );

    // Change the record back to its original state

    const trx2 = await dbClient.newTransaction();
    await testClient.updateOne<VertexTable, 'Flavour'>(
      originalRecord['@rid'],
      { name: originalRecord.name },
      trx2
    );

    await trx2.commit();

    // Assert
    expect(updatedRecord.name).toEqual('Rancid');
    expect(updatedRecord.name).not.toEqual(originalRecord.name);
  });

  it(`should propagate errors from the database`, async () => {
    const trx = await dbClient.newTransaction();
    // Assert
    await expect(
      testClient.updateOne('INVALID_RID', {}, trx)
    ).rejects.toMatchSnapshot();

    await trx.rollback();
  });
});
