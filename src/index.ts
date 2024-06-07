import { SpriteServer } from "./SpriteServer.js";
import { SpriteDatabase } from "./SpriteDatabase.js";

export { SpriteServer };
export { SpriteDatabase };
export * from "./types/index.js";

type ADocumentType = {
  aProperty: string;
};

type DocumentTypes = {
  aDocument: ADocumentType;
};

type AnotherType = {
  anotherDoc: {
    aProperty: string;
  };
};

const db = new SpriteDatabase({
  username: "root",
  password: "999999999",
  address: "http://localhost:2480",
  databaseName: "tester",
});

const client = db.documentModality<DocumentTypes>();

client.transaction(async (trx) => {
  const newDoc = await client.updateOne<"aDocument">(
    "#0:0",
    {
      aProperty: "",
    },
    trx
  );
});
