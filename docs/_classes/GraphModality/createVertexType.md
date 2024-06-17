---

layout: default

title: createVertexType

permalink: /classes/GraphModality/createVertexType.html

---

### _GraphModality&lt;V, E&gt;_.createVertexType

#### Interface

(**typeName: *N*, transaction: *SpriteTransaction*, options: *ISpriteCreateTypeOptions&lt;V, N&gt;***)

Create a new vertex type.

#### Note

<p class="note">non-idempotent commands (such a creating types) must be issued as part of a transaction</p>

#### Example

```ts
const database = new SpriteDatabase({
  username: 'root',
  password: 'rootPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

const client = database.graph<VertexTypes, EdgeTypes>();

async function createVertexTypeExample() {
  try {
    // non-idempotent operations must be conducted within a transaction
    client.transaction(async (trx)=>{
      const type = await client.createVertexType('aType', trx);
      console.log(type.name);
      // 'aType'
    });
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

createVertexTypeExample();

// NOTE: you could control the transaction manually
const trx = await database.newTransaction();
const type = await client.createVertexType('aType', trx);
trx.commit();
```

