---

layout: default

title: newEdge

permalink: /classes/GraphModality/newEdge.html

---

### _GraphModality&lt;V, E&gt;_.newEdge

#### Interface

(**typeName: *N*, to: *SpriteEdgeVertexDescriptor&lt;V, V1&gt;*, from: *SpriteEdgeVertexDescriptor&lt;V, V2&gt;*, transaction: *SpriteTransaction*, options: *ISpriteEdgeOptions***)

Insert a new edge into the database.

#### Example

```ts
// non-idempotent operations must be conducted within a transaction
client.transaction(async ()=>{
  // to create a edge, a type must be created first
  await client.createType('anEdge');
  const edge = await client.newEdge('anEdge', '#0:0', "#1:0", {
    aProperty: 'aValue',
  });
  console.log(edge.data);
  // {
  //   '@rid': '#3:0',
  //   '@cat': 'e',
  //   '@type': 'anEdge',
  //   '@in': '#0:0',
  //   '@out': '#1:0',
  //   aProperty: 'aValue'
  // }
});

// NOTE: you could control the transaction manually
const trx = await database.newTransaction();
client.setTransaction(trx);
await client.createType('anEdge', trx);
const edge = await client.newEdge('anEdge', trx, {
  aProperty: 'aValue',
});
trx.commit();
// ...
```

