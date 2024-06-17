---

layout: default

title: command

permalink: /classes/SpriteServer/command.html

---

### _SpriteServer_.command

#### Interface

(**command: *string***)

A method for sending commands as strings to the server.

#### Example

```ts
const server = new SpriteServer({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
});

async function commandExample(databaseName: string) {
  try {
    const response = await server.command(`CREATE DATABASE ${databaseName}`);
    console.log(response);
    // {
    //   user: 'aUser',
    //   version: '24.4.1',
    //   serverName: 'ArcadeDB_0',
    //   result: 'ok'
    // }
  } catch (error) {
    // Will throw an error for conditions such as:
    // Invalid credentials, Database Already Exists, etc.
    console.error(error);
  }
}

commandExample('aDatabase');
```

