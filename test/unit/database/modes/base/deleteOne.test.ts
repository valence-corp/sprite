import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';
import { ArcadeCommandResponse } from '../../../../../src/types/database.js';
import { testTransaction } from '../../client/testClient.js';
import { DeleteFromCount } from '../../../../../src/types/operators.js';

describe('ModalityBase.deleteOne()', () => {
  it(`correctly passes all options to TypedOperations._deleteOne`, async () => {
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockImplementationOnce(
        async (): Promise<ArcadeCommandResponse<DeleteFromCount[]>> => {
          return {
            user: variables.username,
            serverName: '',
            version: '',
            result: [{ count: 1 }]
          };
        }
      );

    await client.deleteOne(variables.rid, testTransaction);

    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `DELETE FROM ${variables.rid}`,
      testTransaction
    );
  });
});
