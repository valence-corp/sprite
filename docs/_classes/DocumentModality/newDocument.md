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

// NOTE: you could control the transaction manually
const trx = await database.newTransaction();
await client.createType('aDocument', trx);
const document = await client.newDocument('aDocument', trx, {
  aProperty: 'aValue',
});
trx.commit();
// ...
```

