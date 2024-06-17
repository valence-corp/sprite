---

layout: default

title: serverReady

permalink: /classes/SpriteServer/serverReady.html

---

### _SpriteServer_.serverReady

Returns a `boolean` value indicating if the ArcadeDB server is ready.\
Useful for remote monitoring of server readiness.

#### Example

```ts
const client = new SpriteServer({
  username: 'aUser',
  password: 'aPassword',
  address: 'http://localhost:2480',
});

async function serverReadyExample() {
  try {
    const serverReady = await client.serverReady();
    console.log(serverReady);
    // true
  } catch (error) {
    console.error(error);
    // manage error conditions
  }
};

serverReadyExample();
```

