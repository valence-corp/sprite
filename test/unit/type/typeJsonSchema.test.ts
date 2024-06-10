import { SpriteJSONSchema } from "@root/src/types/type.js";
import { typeJsonSchema } from "../../../src/SpriteType.js";
import { DocumentTypes } from "../database/types.js";
import schema from "./schema.json" assert { type: "json" };

describe("typeJsonSchema", () => {
  it("return a schema of the proper type", async () => {
    const schemaTyped: SpriteJSONSchema<DocumentTypes, "aDocument"> =
      typeJsonSchema<DocumentTypes, "aDocument">({
        properties: {
          aProperty: {
            type: "string",
            default: "string",
            minLength: 6,
            maxLength: 8,
          },
          bProperty: {
            type: "boolean",
            default: false,
          },
        },
      });
    expect(schemaTyped).toMatchObject(schema);
  });
});
