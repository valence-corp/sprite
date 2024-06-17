---

layout: default

title: database

permalink: /classes/SpriteServer/database.html

---

### _SpriteServer_.database

#### Interface

(**databaseName: *string***)

Returns an SpriteDatabase client for the supplied `databaseName`,
using the authorization details of the `SpriteServer` client.

#### Example

```ts
const server = new SpriteServer({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
});

const database = await server.database('aDatabase');
console.log(database.name);
// 'aDatabase';
```

