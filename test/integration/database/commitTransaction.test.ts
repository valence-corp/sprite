import { SpriteTransaction } from '../../../src/SpriteTransaction.js';
import { RID_REGEX } from '../regex.js';
import { variables } from '../variables.js';
import { testClient as client, DocumentTypesWithMeta } from './testClient.js';

describe('SpriteDatabase.commitTransaction', () => {
  let transaction: SpriteTransaction;

  // Setup a new transaction before each test
  beforeEach(async () => {
    transaction = await client.newTransaction();
  });

  it('commits a transaction successfully', async () => {
    // Insert a new document within the transaction
    const [createdRecord] = await client.command<
      DocumentTypesWithMeta['ORIDs'][]
    >('sql', `INSERT INTO ${variables.documentType}`, transaction);

    // Query to check if the document exists before the commit
    const [queriedBeforeCommit] = await client.query<
      DocumentTypesWithMeta['ORIDs']
    >(
      'sql',
      `SELECT FROM ${variables.documentType} WHERE @rid = ${createdRecord['@rid']}`
    );

    // Commit the transaction
    await transaction.commit();

    // Query to check if the document exists after the commit
    const [queriedRecordAfterCommit] = await client.query<
      DocumentTypesWithMeta['ORIDs']
    >(
      'sql',
      `SELECT FROM ${variables.documentType} WHERE @rid = ${createdRecord['@rid']}`
    );

    // Assertions
    // The record should not be found before the commit
    expect(queriedBeforeCommit).toBe(undefined);

    // The @rid of the created record should be a string
    expect(typeof createdRecord['@rid']).toBe('string');

    // The @rid of the created record after commit should match the pattern
    expect(createdRecord['@rid']).toMatch(RID_REGEX);

    // The @rid of the queried record after commit should match the pattern
    expect(queriedRecordAfterCommit['@rid']).toMatch(RID_REGEX);

    // The @rid of the created record should match the @rid of the queried record after commit
    expect(queriedRecordAfterCommit['@rid']).toEqual(createdRecord['@rid']);
  });
});
