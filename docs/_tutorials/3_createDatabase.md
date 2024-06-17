---
layout: tutorial
permalink: /tutorials/createDatabase.html
title: Sprite Tutorials - Create a Database
name: Create a Database
nextDesc: Create Documents
nextUrl: /tutorials/createDocument.html
prevDesc: Installation
prevUrl: /tutorials/installation.html
---

### Create a Database

#### Introduction

This tutorial will demonstrate the basics the `SpriteServer` module by using it to create a database.

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteServer](#instantiating)
3. [Check server status](#serverReady)
4. [Creating a database](#createDatabase)
5. [Running the Example](#running)
6. [Conclusion](#conclusion)
7. [What is next?](#next)

<h4 id="prerequisites">Prerequisites</h4>

1. Ensure you have [the installation](installation.html) completed. This means you have ArcadeDB installed, running, and accessible, as well as a TypeScript / JavaScript project with Sprite installed.

<h4 id="instantiating">Instantiating SpriteServer</h4>

Begin by inserting the following snippet into the `index.ts` file of your project:

```ts
// import the SpriteServer class from the sprite package
import { SpriteServer } from "@valence-corp/sprite";

// create an instance of SpriteServer with your root credentials
const client = new SpriteServer({
  username: "root",
  password: "aPassword", // your password,
  address: "http://localhost:2480", // default address for ArcadeDB
});

// create an async function to perform operations on the server
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

// call the example function
createDatabaseExample();
```

<h4 id="serverReady">Checking server status</h4>

SpriteServer contains a method to verify that the server is ready prior to performing operations. Update the `createDatabaseExample()` function with the following code:

```ts
async function createDatabaseExample() {
  try {
    // adding a serverReady check
    const ready = await client.serverReady();
    if (ready) {
      // we will perform our creation operation here
      console.log(ready);
      // true
    }
  } catch (error) {
    throw new Error(
      `There was a problem while running the example.`,
      { cause: error }
    );
  }
}
```

If you execute this code, you will see it log `true` (the return value of the serverReady() method) to the console, if the server is ready.

If the server is not ready, however, you will see an error with quite a long aggregate chain. As an example, the following error is a result of the server having not yet been started:

```
Error: There was a problem while running the example.
    at createDatabaseExample (...)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  [cause]: Error: Unable to check the server status.
      at SpriteServer.serverReady (...)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async createDatabaseExample (...) {
    [cause]: TypeError: fetch failed
```

Sprite was developed to propagate the errors up the chain, so you will often see things like this. It might be overwelming, but once you look at the causes, it becomes obvious exactly what when wrong in the process. Your implementation should account for error handling should you want to handle errors gracefully.

<h4 id="createDatabase">Creating the database</h4>

Update the `createDatabaseExample` function to use the SpriteServer.createDatabase method. We will log the name of the database as part of a message following the successful creation of the database, finally we return the `SpriteDatabase` instance that the `createDatabase` method returns. The `SpriteDatabase` instance can be used to perform operations on the created database, which will be the topic of the next tutorial.

```ts
async function createDatabaseExample() {
  try {
    const ready = await client.serverReady();
    if (ready) {
      // creating a database with the server client
      const database = await client.createDatabase("ExampleDatabase");
      // logging the name of the returned SpriteDatabase instance
      console.log(`${database.name} was created`);
      // "ExampleDatabase was created"
      return database;
    }
  } catch (error) {
    throw new Error(
      `There was a problem while running the example.`,
      { cause: error }
    );
  }
}
```

<h4 id="running">Running the Example</h4>

Below is the complete code for this tutorial. Ensure your code matches this example, and then execute it.

```ts
import { SpriteServer } from "@valence-corp/sprite";

const client = new SpriteServer({
  username: "root",
  password: "aPassword", // your password,
  address: "http://localhost:2480", // default address for ArcadeDB
});

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

createDatabaseExample();
```

<h4 id="conclusion">Conclusion</h4>

There should now be a database on your server called "ExampleDatabase".

---

###### Note

You can verify the existence of a database on the server by utilizing one of the following:

- [SpriteServer.listDatabases](/classes/SpriteServer/listDatabases.html)
- [SpriteServer.databaseExists](/classes/SpriteServer/databaseExists.html)
- [ArcadeDB server console]().

---

<h4 id="next">What is next?</h4>

The next section will demonstrate how to use the `DocumentModality` within the `SpriteDatabase` module to perform operations on the database.
