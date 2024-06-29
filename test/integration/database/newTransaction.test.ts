import { SpriteTransaction } from '../../../src/SpriteTransaction.js';
import { testClient as client } from './testClient.js';

const regex =
  /^AS-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

describe('SpriteDatabase.newTransaction', () => {
  it('has a valid transaction ID', async () => {
    const transaction = await client.newTransaction();
    expect(transaction).toBeInstanceOf(SpriteTransaction); // Ensure transaction is an instance of SpriteTransaction
    expect(transaction.id).toBeTruthy(); // Ensure transaction ID is truthy
    expect(typeof transaction.id).toBe('string'); // Check if transaction ID is a string
    expect(transaction.id).toMatch(regex); // Check if transaction ID matches the regex pattern
  });
});
