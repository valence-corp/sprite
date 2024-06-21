---
layout: tutorial
permalink: /tutorials/createDatabase.html
title: Sprite Tutorials - Create a Database
name: Create a Database
nextDesc: Transactions
nextUrl: /tutorials/transactions.html
prevDesc: Installation
prevUrl: /tutorials/installation.html
filename: 3_createDatabase.md
---

This tutorial will demonstrate the basics of the `SpriteServer` module by using it to create a database.

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteServer](#instantiating-spriteserver)
3. [Check server status](#checking-server-status)
4. [Creating a database](#create-a-database)
5. [Running the Example](#running-the-example)
6. [Conclusion](#conclusion)
7. [What's Next?](#whats-next)

#### Prerequisites
---------------

* Ensure you have completed the [installation](installation.html) process, which includes installing ArcadeDB, running it, and accessing it from a TypeScript/JavaScript project with Sprite installed.

#### Instantiating SpriteServer
---------------------------

Begin by inserting the following code into your project's `index.ts` file:

```ts
import { SpriteServer } from "@valence-corp/sprite";

const client = new SpriteServer({
  username: "root",
  password: "your_password", // replace with your password
  address: "http://localhost:2480", // default address for ArcadeDB
});

async function createDatabaseExample() {
  try {
    // code from the tutorial goes here
  } catch (error) {
    throw new Error(
      `There was a problem while creating the database.`,
      { cause: error }
    );
  }
}

createDatabaseExample();
```

#### Checking Server Status
-------------------------

Update the `createDatabaseExample()` function to include a server status check:

```ts
async function createDatabaseExample() {
  try {
    const ready = await client.serverReady();
    if (ready) {
      // perform creation operation here
      console.log(ready); // true if the server is ready
    }
  } catch (error) {
    throw new Error(
      `There was a problem while running the example.`,
      { cause: error }
    );
  }
}
```

If the server is not ready, an error will be thrown with a detailed error message.

#### Creating a Database
---------------------

Update the `createDatabaseExample()` function to create a database using the `SpriteServer.createDatabase` method:

```ts
async function createDatabaseExample() {
  try {
    const ready = await client.serverReady();
    if (ready) {
      const database = await client.createDatabase("ExampleDatabase");
      console.log(`${database.name} was created`);
      return database;
    }
  } catch (error) {
    throw new Error(
      `There was a problem while creating the database.`,
      { cause: error }
    );
  }
}
```

#### Running the Example
---------------------

Ensure your code matches the above example, and then execute it.

#### Conclusion
----------

You should now have a database on your server called "ExampleDatabase". You can verify the existence of the database using one of the following methods:

* [SpriteServer.listDatabases](/classes/SpriteServer/listDatabases.html)
* [SpriteServer.databaseExists](/classes/SpriteServer/databaseExists.html)
* [ArcadeDB server console](https://docs.arcadedb.com/#Console)

#### What's Next?
--------------

The next section will demonstrate how to access the `DocumentModality` from the `SpriteDatabase` to define a document type and create a new document.