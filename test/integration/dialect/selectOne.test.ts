import { RecordMeta } from '../../../src/types/database.js';
import { testClient } from './testclient.js';

interface Flavour {
  name: string;
}

const dbClient = testClient.database;
const typeName = 'Flavour';

describe('SqlDialect.selectOne()', () => {
  it(`should select a record`, async () => {
    // Arrange

    const [queryResult] = await dbClient.query<Flavour & RecordMeta>(
      'sql',
      `SELECT * FROM ${typeName} LIMIT 1`
    );

    // Act
    const selectOneResult = await testClient.selectOne(queryResult['@rid']);

    // Assert
    await expect(queryResult).toEqual(selectOneResult);
  });

  it(`should propagate errors from the database`, async () => {
    // Assert
    await expect(testClient.selectOne('INVALID_RID')).rejects.toMatchSnapshot();
  });
});
