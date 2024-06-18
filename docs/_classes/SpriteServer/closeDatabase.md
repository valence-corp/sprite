---

layout: default

title: closeDatabase

permalink: /classes/SpriteServer/closeDatabase.html

---

### _SpriteServer_.closeDatabase

#### Interface

(**databaseName: *string***)

Close a database

#### Example

```ts
const server = new SpriteServer({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
});

async function closeDatabaseExample(databaseName: string) {
  try {
    const closed = await server.closeDatabase(databaseName);
    console.log(closed);
    // true
  } catch (error) {
    console.error(error);
    // manage error conditions
  }
};

closeDatabaseExample('aDatabase');
```

