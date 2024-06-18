---

layout: default

title: openDatabase

permalink: /classes/SpriteServer/openDatabase.html

---

### _SpriteServer_.openDatabase

#### Interface

(**databaseName: *string***)

Open a database

#### Example

```ts
const server = new SpriteServer({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
});

async function openDatabaseExample(databaseName: string) {
  try {
    const open = await server.openDatabase(databaseName);
    console.log(open);
    // true
  } catch (error) {
    console.error(error);
    // handle errors
  }
};

openDatabaseExample('aDatabase');
```

