---

layout: default

title: query

permalink: /classes/SpriteDatabase/query.html

---

### _SpriteDatabase_.query

#### Interface

(**language: *ArcadeSupportedQueryLanguages*, command: *string*, params: *Record&lt;string, any&gt;***)

Executes a query against the target database. This method only executes
idempotent statements (that cannot change the database), namely `SELECT`
and `MATCH`. The execution of non-idempotent commands will throw an
`IllegalArgumentException` exception. If you are trying to execute
non-idempotent commands, see the `SpriteDatabase.command()` method.

#### Example

```ts
const database = new SpriteDatabase({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

async function spriteQueryExample() {
  try {
    const result = await database.query(
      'sql',
      'SELECT FROM schema:types'
    );
    console.log(result);
    // { 
    //   user: 'aUser',
    //   version: '24.x.x',
    //   serverName: 'ArcadeDB_0',
    //   result: [...]
    // }
  return result
  } catch (error) {
    console.error(error);
    // handle error conditions
  }
};

spriteQueryExample();
```

