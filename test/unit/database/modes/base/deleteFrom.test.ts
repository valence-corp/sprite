import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';
import {
  ArcadeCommandResponse,
  ArcadeSupportedQueryLanguages,
} from '../../../../../src/types/database.js';
import { testTransaction } from '../../client/testClient.js';
import { DeleteFromCount } from '../../../../../src/types/operators.js';

const typeName = 'aDocument';

describe('ModalityBase.deleteFrom()', () => {
  it(`correctly passes all options to TypedOperations._deleteFrom`, async () => {
    jest
      .spyOn(SpriteDatabase, 'command')
      .mockImplementationOnce(
        async (
          lanugage: ArcadeSupportedQueryLanguages,
          options: any,
        ): Promise<ArcadeCommandResponse<DeleteFromCount[]>> => {
          return {
            user: variables.username,
            serverName: '',
            version: '',
            result: [{ count: 1 }],
          };
        },
      );

    await client.deleteFrom(typeName, testTransaction, {
      where: ['@rid', '!!', variables.rid],
      limit: 1,
      return: 'BEFORE',
      timeout: 10000,
    });

    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `DELETE FROM ${typeName} RETURN BEFORE WHERE @rid !! '${variables.rid}' LIMIT 1 TIMEOUT 10000`,
      testTransaction,
    );
  });
});
