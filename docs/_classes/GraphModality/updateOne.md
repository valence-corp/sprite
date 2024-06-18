---

layout: default

title: updateOne

permalink: /classes/GraphModality/updateOne.html

---

### _GraphModality&lt;V, E&gt;_.updateOne

#### Interface

(**rid: *string*, data: *OmitMeta*, transaction: *SpriteTransaction***)

Update one record in the database, by providing an RID.

#### Example

```ts
const database = new SpriteDatabase({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aSpriteDatabase'
});

type DocTypes = {
  aType: {
    aField: string
  }
}

const docs = database.documents<DocTypes>();

async function updateOneExample() {
  try {
    await docs.transaction(async (trx) => {
      const result = await docs.updateOne('#0:0', { aField: 'aValue' }, trx);
      console.log(result);
      // {
      //   '@rid': '#0:0',
      //   '@type': 'aType',
      //   '@cat': 'd',
      //   aField: 'aValue'
      // }
    });
  } catch (error) {
    console.error(error);
    // handle error conditions
  }
};

updateOneExample();
```

