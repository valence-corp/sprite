import { RID_REGEX } from '../regex.js';
import { testClient } from './testclient.js';

interface DocumentTypes {
  ORIDs: {
    aProperty: string;
  };
}

const typeName = 'ORIDs';
const dbClient = testClient.database;
type TypeName = typeof typeName;

const data = {
  aProperty: 'aValue'
};

const insertRecordTyped = testClient.insertRecord<DocumentTypes, TypeName>;

describe('SqlDialect.insertRecord()', () => {
  it(`should insert a record`, async () => {
    const trx = await dbClient.newTransaction();

    // Act
    const [doc] = await insertRecordTyped(typeName, trx, {
      data
    });

    // reverse the creation
    trx.rollback();

    // Assert
    expect(doc['@rid']).toMatch(RID_REGEX);
    expect(doc['@cat']).toBe('d');
    expect(doc['@type']).toBe(typeName);
    expect(doc.aProperty).toBe('aValue');
  });

  it(`should propagate errors from the database`, async () => {
    const trx = await dbClient.newTransaction();

    // Assert
    await expect(
      // @ts-expect-error - testing invalid type
      insertRecordTyped('INVALID_TYPE', trx, {
        data
      })
    ).rejects.toMatchSnapshot();

    // reverse the creation
    trx.rollback();
  });
});
