---

layout: default

title: newVertex

permalink: /classes/GraphModality/newVertex.html

---

### _GraphModality&lt;V, E&gt;_.newVertex

#### Interface

(**typeName: *N*, transaction: *SpriteTransaction*, options: *ISpriteInsertRecordOptions***)

Insert a new vertex into the database.

#### Example

```ts
// non-idempotent operations must be conducted within a transaction
client.transaction(async (trx)=>{
  // to create a vertex, a type must be created first
  await client.createType('aVertex', trx);
  const vertex = await client.newVertex('aVertex', trx, {
    aProperty: 'aValue',
  });
  console.log(vertex);
  // {
  //   '@rid': '#0:0',
  //   '@cat': 'v',
  //   '@type': 'aVertex',
  //   'aProperty': 'aValue'
  // }
});

// NOTE: you could control the transaction manually
const trx = await database.newTransaction();
client.setTransaction(trx);
await client.createType('aVertex', trx);
const vertex = await client.newVertex('aVertex', trx, {
  aProperty: 'aValue',
});
trx.commit();
// ...
```

