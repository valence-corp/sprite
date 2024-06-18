---
layout: tutorial
permalink: /tutorials/createDocument.html
title: Sprite Tutorials — Create a Document
name: Create a Document
nextDesc: Graphs
nextUrl: /tutorials/createGraph.html
prevDesc: Transations
prevUrl: /tutorials/transactions.html
---

### Create a Document

#### Introduction

This tutorial will demonstrate the basics of using the `DocumentModality` via the `SpriteDatabase` module to define a document type, and create a document.


#### Overview

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteDatabase](#instantiating)
3. [Accessing the DocumentModality](#modality)
4. [Transactions](#transactions)
5. [Creating a database](#createDatabase)
6. [Conclusion](#conclusion)
7. [What is next](#next)

<h4 id="prerequisites">Prerequisites</h4>

1. Ensure you have [the installation](../installation.html) completed. This means you have ArcadeDB installed, running, and accessible, as well as a TypeScript / JavaScript project with Sprite installed.
2. You have created a database called "ExampleDatabase", like accomplished in the [Create a Database tutorial]()

<h4 id="instantiating">Instantiating SpriteDatabase</h4>

Begin by inserting the following snippet into the `index.ts` file of your project. This imports the `SpriteDatabase` module, and creates an instance of it named `db`.

```ts
// import the SpriteDatabase class from the sprite package
import { SpriteDatabase } from "@valence-corp/sprite";

// create an instance of SpriteDatabase with your credentials
// and the name of the target database
const db = new SpriteDatabase({
  username: "aUsername", // root will be ok for this tutorial
  password: "aPassword", // your password,
  address: "http://localhost:2480", // default address for ArcadeDB
  databaseName: "ExampleDatabase", // the existing database
});
```

<h4 id="modality">Accessing the DocumentModality</h4>

Add the following code bellow the previous section.

The `DocumentModality` is accessed via the `SpriteDatabase` instance we created. Types are defined in the `ExampleDocument` interface and provided as a parameter to the `documentModality` accessor method.

---

###### Note

The accessor method returns a [singleton instance](https://en.wikipedia.org/wiki/Singleton_pattern) of `DocumentModality`. The library just uses the accessor method to define types for it, so you can create many typed modalities without any additional runtime overhead.

---

```ts

// define some types to use for this example
interface ExampleDocuments {
  aDocument: {
    aProperty: string;
  };
  bDocument: {
    bProperty: number;
  };
}

// create an instance of the SpriteDatbase.documentModality
// with the types we wish to access as a parameter
const client = db.documentModality<ExampleDocuments>();

// create an async function to perform operations on the database
async function documentModalityExample() {
  try {
    // code from the tutorial will be inserted here
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}

// call the example function
documentModalityExample();
```

<h4 id="transactions">Transactions</h4>

ArcadeDB is a transactional database. This is preferred for applications that require a high level of data integrity. All non-idempotent operations (operations that can change the database) must be part of a transaction.

Sprite has various methods for orchestrating transactions, but this tutorial will demonstrate the `DocumentModality.transaction()` method, which incorporates some abstraction to reduce boilerplate (for information on that, see the [API documentation](/classes/DocumentModality/transaction.html)).

```ts
async function documentModalityExample() {
  try {
    // a transaction is created, it's only argument is
    // a callback (which is passed the transaction)
    client.transaction(async (trx) => {
      // ...operations go here
      // the transaction is automatically committed
      // following callback execution
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}
```
---
###### Note

There is additional information on transactions in the following locations.

1. SpriteDatabase.command() tutorial
2. Wikipedia Transactional Database

---

<h4 id="createDatabase">Creating a Type</h4>

Within the transaction callback, we will call the `DocumentModality.createType()` method, and pass it the transaction (`trx`) that is supplied as a parameter to the callback. This operation should be awaited to avoid an error with the `newDocument` method we will add in the next step (the type must be present in the database to create a record with that type).

```ts
async function documentModalityExample() {
  try {
    client.transaction(async (trx) => {
      // the transaction should be passed to all
      // non-idempotent commands issued herein
      await client.createType("aDocument", trx);
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}
```

<h4 id="newDocument">Creating a Document</h4>

Following the `createType` operation, insert the `newDocument` method. Ensure the transaction is passed to it also. Optionally, data can be included at record creation. The properties will be automatially typed as defined in the `ExampleDocuments` interface created earlier.

```ts
async function documentModalityExample() {
  try {
    client.transaction(async (trx) => {
      await client.createType("aDocument", trx);

      // create a new document with the type
      // created in the previous line, note that
      // the transaction is the second argument
      client.newDocument("aDocument", trx, {
        data: {
          aProperty: "aValue",
        },
      });
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}
```


<h4 id="running">Running the Example</h4> 

```ts
import { SpriteDatabase } from "@valence-corp/sprite";

const db = new SpriteDatabase({
  username: "aUsername",
  password: "aPassword",
  address: "http://localhost:2480",
  databaseName: "ExampleDatabase",
});

interface ExampleDocuments {
  aDocument: {
    aProperty: string;
  };
  bDocument: {
    bProperty: number;
  };
}

const client = db.documentModality<ExampleDocuments>();

async function documentModalityExample() {
  try {
    client.transaction(async (trx) => {
      await client.createType("aDocument", trx);

      client.newDocument("aDocument", trx, {
        data: {
          aProperty: "aValue",
        },
      });
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}

documentModalityExample();
```

<h4 id="conclusion">Conclusion</h4> 

There should now be a database on your server called "ExampleDatabase".

Note You can verify the existence of a database on the server by utilizing one of the following:

- SpriteServer.listDatabases()
- SpriteServer.databaseExists()
- [ArcadeDB server console]().

<h4 id="next">What is next?</h4>

The next section will demonstrate how to use the `SpriteDatabase` module to perform operations on the database.
