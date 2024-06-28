import { SpriteTransaction } from '../../../src/SpriteTransaction.js';
import { testClient as client } from './testClient.js';

let transaction: SpriteTransaction;

beforeAll(async () => {
  transaction = await client.newTransaction();
});

describe('SpriteDatabase.newTransaction', () => {
  it('has a valid transaction ID', () => {
    expect(transaction.id).toBeTruthy(); // Ensure transaction ID is truthy
    expect(typeof transaction.id).toBe('string'); // Check if transaction ID is a string
  });
});
