import { SpriteServer } from "./SpriteServer.js";
import { SpriteDatabase } from "./SpriteDatabase.js";
import { ArcadeEmbeddedMap } from "./types/type.js";

export { SpriteServer };
export { SpriteDatabase };
export * from "./types/index.js";

type ADocumentType = {
  aProperty: string;
  bProperty: ArcadeEmbeddedMap<number>;
};

type DocumentTypes = {
  aDocument: ADocumentType;
};

type AnotherType = {
  anotherDoc: {
    aProperty: string;
  };
};

const server = new SpriteServer({
  username: "root",
  password: "999999999",
  address: "http://localhost:2480",
});

server.dropDatabase("tester").then(() => {
  server.createDatabase("tester").then(async (db) => {
    const client = db.documentModality<DocumentTypes>();

    await client.transaction(async (trx) => {
      const aDocumentType = await client.createType("aDocument", trx);

      const thing = await aDocumentType.model(
        {
          aProperty: {
            type: "string",
            default: "aProperty",
            min: 5,
          },
          bProperty: {
            type: "map",
            default: { thing: 4 },
            mandatory: true,
            notnull: true,
          },
        },
        trx
      );
      client.newDocument("aDocument", trx);
      console.log(thing);
    });
    const doc = await client.selectFrom("aDocument", {
      where: ["@rid", "!=", "#2:0"],
    });
    console.log(doc);
  });
});
