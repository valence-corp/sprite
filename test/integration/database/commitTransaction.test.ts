import { AsArcadeRecords, WithRid } from '../../../src/types/database.js';
import { SpriteTransaction } from '../../../src/SpriteTransaction.js';
import { variables } from '../variables.js';
import {
  testClient as client,
  DocumentTypes,
  DocumentTypesWithMeta
} from './testClient.js';

describe('SpriteDatabase.commitTransaction', () => {
  let transaction: SpriteTransaction;

  beforeEach(async () => {
    transaction = await client.newTransaction();
  });

  it('commits a transaction successfully', async () => {
    const {
      result: [record]
    } = await client.command<DocumentTypesWithMeta['ORIDs'][]>(
      'sql',
      `INSERT INTO ${variables.documentType}`,
      transaction
    );

    await transaction.commit();

    const result = await client.query(
      'sql',
      `SELECT FROM ${variables.documentType} WHERE @rid = ${record['@rid']}`
    );
  });
});
