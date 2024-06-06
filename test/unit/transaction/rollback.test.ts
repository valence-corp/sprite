import { SpriteTransaction } from '../../../src/SpriteTransaction.js';
import { variables } from '../../variables.js';
import { client as SpriteDatabase } from '../database/client/testClient.js';

describe('SpriteTransaction.rollback()', () => {
  it('should send the provided sessionId to SpriteDatabase.rollbackTransaction()', async () => {
    jest
      .spyOn(SpriteDatabase, 'rollbackTransaction')
      .mockImplementationOnce(async (sessionId: string): Promise<boolean> => {
        return true;
      });
    const transaction = new SpriteTransaction(
      SpriteDatabase,
      variables.sessionId,
    );

    await transaction.rollback();

    expect(SpriteDatabase.rollbackTransaction).toHaveBeenCalledWith(
      variables.sessionId,
    );
  });
});
