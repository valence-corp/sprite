import { RID_REGEX } from '../regex.js';
import { variables } from '../variables.js';
import { testClient as client, DocumentTypesWithMeta } from './testClient.js';

describe('SpriteDatabase.rollbackTransaction', () => {
  it('rollsback the transaction', async () => {
    const transaction = await client.newTransaction();

    // Insert a new document within the transaction
    const [createdRecord] = await client.command<
      DocumentTypesWithMeta['ORIDs'][]
    >('sql', `INSERT INTO ${variables.documentType}`, transaction);

    // Rollback the transaction
    const didRollBack = await client.rollbackTransaction(transaction.id);

    // Query to check if the document exists after the rollback
    const [queriedRecordAfterRollback] = await client.query<
      DocumentTypesWithMeta['ORIDs']
    >(
      'sql',
      `SELECT FROM ${variables.documentType} WHERE @rid = ${createdRecord['@rid']}`
    );

    // Assertions
    expect(createdRecord['@rid']).toMatch(RID_REGEX);
    expect(queriedRecordAfterRollback).toBe(undefined);
    expect(didRollBack).toBe(true);
    await expect(
      client.commitTransaction(transaction.id)
    ).rejects.toMatchSnapshot();
  });
});
