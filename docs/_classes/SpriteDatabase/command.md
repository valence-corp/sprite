---

layout: default

title: command

permalink: /classes/SpriteDatabase/command.html

---

### _SpriteDatabase_.command

#### Interface

(**language: *ArcadeSupportedQueryLanguages*, command: *string*, transaction: *SpriteTransaction*, options: ****)

Executes a command on the target database. This method only executes
non-idempotent statements (that can change the database), such as `INSERT`,
`CREATE`, and `DELETE`. The execution of idempotent commands will throw an
`IllegalArgumentException` exception. If you are trying to execute
idempotent commands, see the `SpriteDatabase.query()` method.

#### Example

```ts
const database = new SpriteDatabase({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
  databaseName: 'aDatabase'
});

async function spriteCommandExample() {
  try {
    // commands are non-idempotent, and must be
    // conducted as part of a transaction
    const transaction = await database.newTransaction();
    const result = await database.command(
      'sql',
      'CREATE document TYPE aType',
      transaction
    );
    transaction.commit();
    console.log(result);
    // {
    //  user: 'aUser',
    //  version: '24.x.x (build [...])',
    //  serverName: 'ArcadeDB_0',
    //  result: [ { operation: 'create document type', typeName: 'aType' } ]
    // }
    return result;
  } catch (error) {
    // handle error conditions
    console.error(error);
  }
};

spriteCommandExample();
```

