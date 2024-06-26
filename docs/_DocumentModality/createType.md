---

layout: default

title: createType

permalink: /DocumentModality/createType.html

---

### _DocumentModality&lt;S&gt;_.createType

#### Interface

(**typeName: *N*, transaction: *SpriteTransaction*, options: *ISpriteCreateTypeOptions&lt;S, N&gt;***)

Create a new document type in the schema.

#### Note

<p class="note">non-idempotent commands (such a creating types) must be issued as part of a transaction</p>

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

const client = database.documentModality<DocumentTypes>();

async function createDocumentTypeExample() {
  try {
    // non-idempotent operations must be conducted within a transaction
    client.transaction(async (trx)=>{
      const type = await client.createType('aDocument', trx);
      console.log(type.name);
      // 'aType'
    });
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

createDocumentTypeExample();
```
