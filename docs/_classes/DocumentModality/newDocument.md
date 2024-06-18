---

layout: default

title: newDocument

permalink: /classes/DocumentModality/newDocument.html

---

### _DocumentModality&lt;S&gt;_.newDocument

#### Interface

(**typeName: *N*, transaction: *SpriteTransaction*, options: *ISpriteInsertRecordOptions***)

Insert a new document into the database.

#### Example

```ts
const database = new Database({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

interface DocumentTypes {
  aDocument: {
    aProperty: string
  }
}

const client = database.documents<DocumentTypes>();

// non-idempotent operations must be conducted within a transaction
client.transaction(async (trx)=>{
  // to create a document, a type must be created first
  await client.createType('aDocument', trx);
  const document = await client.newDocument('aDocument', trx, {
    aProperty: 'aValue',
  });
  console.log(document);
  // {
  //   '@rid': '#0:0',
  //   '@cat': 'd',
  //   '@type': 'aDocument',
  //   aProperty: 'aValue'
  // }
});
```

