import { client, dbClient as SpriteDatabase } from "./testClient.js";
import { variables } from "../../../../variables.js";
import { ArcadeCommandResponse } from "../../../../../src/types/database.js";
import { testTransaction } from "../../client/testClient.js";

const typeName = "aDocument";

describe("ModalityBase.dropType()", () => {
  it(`correctly passes all options to TypedOperations._dropType`, async () => {
    jest
      .spyOn(SpriteDatabase, "command")
      .mockImplementationOnce(
        async (): Promise<ArcadeCommandResponse<unknown>> => {
          return {
            user: variables.username,
            serverName: "",
            version: "",
            result: [{ typeName }],
          };
        },
      );

    await client.dropType(typeName, testTransaction, {
      ifExists: true,
      unsafe: true,
    });

    expect(SpriteDatabase.command).toHaveBeenCalledWith(
      `sql`,
      `DROP TYPE ${typeName} UNSAFE IF EXISTS`,
      testTransaction,
    );
  });
});
