import { client, dbClient as SpriteDatabase } from './testClient.js';
import { variables } from '../../../../variables.js';
import {
  ArcadeCommandResponse,
  ArcadeQueryResponse,
  ArcadeSupportedQueryLanguages,
} from '../../../../../src/types/database.js';

const typeName = 'aDocument';

describe('ModalityBase.selectFrom()', () => {
  it(`correctly passes all options to TypedOperations._selectFrom`, async () => {
    jest
      .spyOn(SpriteDatabase, 'query')
      .mockImplementationOnce(
        async (
          lanugage: ArcadeSupportedQueryLanguages,
          options: any,
        ): Promise<ArcadeQueryResponse<unknown[]>> => {
          return {
            user: variables.username,
            serverName: '',
            version: '',
            result: [],
          };
        },
      );

    await client.selectFrom(typeName, {
      where: ['@rid', '!!', variables.rid],
      limit: 1,
      timeout: {
        duration: 10000,
        strategy: 'RETURN',
      },
      orderBy: {
        field: 'aProperty',
        direction: 'DESC',
      },
    });

    expect(SpriteDatabase.query).toHaveBeenCalledWith(
      `sql`,
      `SELECT FROM ${typeName} WHERE @rid !! '${variables.rid}' ORDER BY aProperty DESC LIMIT 1 TIMEOUT 10000 RETURN`,
    );
  });
});
