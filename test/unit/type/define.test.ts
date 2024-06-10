import { testTransaction } from "../database/client/testClient.js";
import { client } from "./testClient.js";

import { typeJsonSchema } from "../../../src/SpriteType.js";
import { DocumentTypes } from "../database/types.js";
import { variables } from "../../variables.js";

describe("SpriteType.define", () => {
  it("make a properly formatted fetch request", async () => {
    jest.spyOn(client, "createProperty").mockResolvedValueOnce({
      result: [{}],
    } as any);

    // property: keyof S[N],
    // dataType: ArcadePropertyDataType,
    // transaction: SpriteTransaction,
    // options?: ISpritePropertyOptions

    const typedSchema = typeJsonSchema<DocumentTypes, "aDocument">({
      properties: {
        aProperty: {
          type: "string",
          default: "string",
          minLength: 6,
          maxLength: 8,
        },
      },
    });
    await client.define(typedSchema, testTransaction);
    expect(client.createProperty).toHaveBeenCalledWith(
      "aProperty",
      "STRING",
      testTransaction,
      {
        constraints: {
          default: "string",
          min: 6,
          max: 8,
        },
        embeddedType: "false",
        ifNotExists: true,
      }
    );
  });
});
