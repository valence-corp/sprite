---
layout: tutorial
permalink: /tutorials/select.html
title: Sprite Tutorials - Select Records
name: Select Records
prevDesc: Create a Graph
prevUrl: /tutorials/createGraph.html
filename: 7_select.md
---

Abstractions for `selectOne` and `selectFrom` exists on `DocumentModality`, and `GraphModality`. You are welcome to write your own queries using the `SpriteDatabase.query` method as well.

This tutorial will cover all three of these methods.

#### Overview
---

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteDatabase](#instantiating)
3. [SpriteDatabase.query](#query)
4. [selectOne](#selectOne)
5. [selectFrom](#why)
6. [Conclusion](#conclusion)
7. [What is next](#next)

#### Prerequisites
---

1. Ensure you have [the installation](../installation.html) completed. This means you have ArcadeDB installed, running, and accessible, as well as a TypeScript / JavaScript project with Sprite installed.
2. You have created a database called "ExampleDatabase", in the [Create a Database tutorial]().
3. You have a document in "ExampleDatabase", in the [Create a Document tutorial]().

#### Instantiating SpriteDatabase
---

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

type ADocumentType = {
  aProperty: string
}

type DocumentTypes = {
  aDocument: ADocumentType
}

```

#### SpriteDatabase.query()
---

The following code is to be inserted under the database instantiation. The `manualTransaction` function creates a new transaction, issues a command using that transaction, and then commits the transaction. All commands are non-idempotent in ArcadeDB (and Sprite). Non-idempotent means that it can change the database, so things like CRUD operations.

```ts
async function selectQueryExample() {
  try {
    // ArcadeDB supports various query
    // lanagues, so it must be specified
    // See ArcadeDB docs for a full list
    const result = await db.query<ADocumentType>(
      'sql',
      'SELECT * from aDocument'
    );

    console.log(result);
    // { 
    //   user: 'aUsername',
    //   version: '24.x.x',
    //   serverName: 'ArcadeDB_0',
    //   result: [
    //     {
    //       '@rid': '#0:0',
    //       '@cat': 'd',
    //       '@type': 'aDocument',
    //       aProperty: 'aValue'
    //     }
    //   ]
    // }

  } catch (error) {
    // handle error conditions
    throw new Error(
      'An error occured while running the example',
      { cause: error }
    )
  }
}
```
