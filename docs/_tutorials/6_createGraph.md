---
layout: tutorial
permalink: /tutorials/createGraph.html
title: Sprite Tutorials — Create a Graph
name: Create a Graph
prevDesc: Add a Document
prevUrl: /tutorials/createDocument.html
nextDesc: Selecting Records
nextUrl: /tutorials/select.html
---

### Create a Graph

#### Introduction

Sprite uses the `GraphModality` to create graphs. Graphs consist of vertexes (points) and edges connecting them (lines). Both vertex and edges can contain data properties, like documents.

---

###### Note

If you are new to graph theory there are many resources to learn from:

- YouTube video
- Something Else
- Ask an AI Assistant of your choosing

---

#### Overview

This tutorial will demonstrate creating the types which define the vertexes and edges of our graph, and then inserting records into the database to build the graph with the types we define.

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Accessing the GraphModality](#modality)
4. [Create a Transaction](#transaction)
5. [Creating Graph Types](#createTypes)
6. [Create the Vertexes](#createVertexes)
7. [Create an Edge](#createEdge)
8. [Running the Example](#running)
9. [Conclusion](#conclusion)
10. [What is next](#next)

<h4 id="prerequisites">Prerequisites</h4>

1. Ensure you have [the installation](../installation.html) completed. This means you have ArcadeDB installed, running, and accessible, as well as a TypeScript / JavaScript project with Sprite installed.
2. You have created a database called "ExampleDatabase" per the [Creating a Database tutorial]()

<h4 id="setup">Setup</h4>

Begin by inserting the following snippet into the `index.ts` file of your project:

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

<h4 id="modality">Accessing the GraphModality</h4>

The `GraphModality` is accessed via the `SpriteDatabase` instance we created. Types are defined in the `ExampleVertexes` and `ExampleEdges` interfaces provided as a parameters to the `graphModality` accessor method.

Add the following code bellow the previous section.

---

###### Note

The accessor method returns a singleton instance of `GraphModality`. The library just uses the accessor method to define types for it. As a result, you can create many typed modalities without any additional runtime overhead.

---

```ts
// define the vertex type
interface ExampleVertexes {
  User: {
    name: string;
  };
}

// define the edge type
interface ExampleEdges {
  Friends: {
    since: number;
  };
}

// create an instance of the SpriteDatbase.graphModality
// with the types we wish to access as parameters
const client = db.graphModality<ExampleVertexes, ExampleEdges>();

// create an async function to perform operations on the database
async function graphModalityExample() {
  try {
    // code from the tutorial will be inserted here
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}

// call the example function
graphModalityExample();
```

<h4 id="transaction">Create a Transaction</h4>

ArcadeDB is a transactional database. This is preferred for applications that require a high level of data integrity. All non-idempotent operations (operations that can change the database) must be part of a transaction.

Sprite has various methods for orchestrating transactions, but this tutorial will demonstrate the `GraphModality.transaction()` method, which incorporates some abstraction to make it streamlined for many use cases.

```ts
async function graphModalityExample() {
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

<h4 id="createTypes">Creating Graph Types</h4>

Within the transaction callback, we will call the `GraphModality.createVertexType()`, and `GraphModality.createEdgeType()` methods. These operations should be awaited to avoid an error with the `newEdge` and `newVertex` operations we will add in the next step (the types must be present in the database to create records with that type).

The `ifNotExists` option is set to `true` on the type creation operations. This prevents the database from throwing an error if the types where previously created. It is, however, an option.

```ts
async function graphModalityExample() {
  try {
    client.transaction(async (trx) => {
      // the transaction should be passed to all
      // non-idempotent commands issued herein
      await client.createVertexType("User", trx, {
        ifNotExists: true,
      });
      await client.createEdgeType("Friends", trx, {
        ifNotExists: true,
      });
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}
```

<h4 id="creatingVertexes">Creating the Vertexes</h4>

The `newVertex` method (and the other record creation methods) allow for the creation of multiple records in the same operation. This is preferrable to sending a command for each record, although also valid. Just send the data for the desired records as an array of objects representing the records.

The result will be returned as an array of the created records. This example destructures the expected results for use in the next step.

```ts
async function graphModalityExample() {
  try {
    client.transaction(async (trx) => {
      await client.createVertexType("User", trx, {
        ifNotExists: true,
      });
      await client.createEdgeType("Friends", trx, {
        ifNotExists: true,
      });

      // create two vertexes with the type
      // created in the previous line, note that
      // the transaction is the second argument
      const [vertex1, vertex2] = await client.newVertex("User", trx, {
        data: [
          {
            name: "John",
          },
          {
            name: "Jane",
          },
        ],
      });
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}
```

<h4 id="createEdge">Creating an Edge</h4>

To create an edge we will use the `GraphModality.newEdge()` method. This example utilizes the `@rid` of the created records, but that is only for brevity. The `GraphModality.newEdge()` method allows for defining edges between records that match "key descriptions", this can result in creating multiple edges between any records that match the provided key / index. See [the api documentation]() for details.

There is also a `console.log` call added to log the records that were created.

```ts
async function graphModalityExample() {
  try {
    client.transaction(async (trx) => {

      await client.createVertexType("User", trx, {
        ifNotExists: true,
      });
      await client.createEdgeType("Friends", trx, {
        ifNotExists: true,
      });

      const [vertex1, vertex2] = await client.newVertex("User", trx, {
        data: [
          {
            name: "John",
          },
          {
            name: "Jane",
          },
        ],
      });

      // an edge is created by placing the @rid
      // of the vectors you wish to connect as
      // parameters, the transaction, and
      // (optionally) data contained within
      // the edge
      const edge = await client.newEdge(
        "Friends",
        vertex1['@rid'],
        vertex2["@rid"],
        trx,
        {
          data: {
            since: new Date().getDate();
          }
        }
      );

      // we are logging the results
      // to provide some confirmation
      console.log({
        vertex1,
        vertex2,
        edge
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

Below is the complete code for this tutorial. Ensure your code matches this example, and then execute it.

```ts
import { SpriteDatabase } from "@valence-corp/sprite";

const db = new SpriteDatabase({
  username: "aUsername", // root will be ok for this tutorial
  password: "aPassword", // your password,
  address: "http://localhost:2480", // default address for ArcadeDB
  databaseName: "ExampleDatabase", // the existing database
});

interface ExampleVertexes {
  User: {
    name: string;
  };
}

interface ExampleEdges {
  Friends: {
    since: string;
  };
}

const client = db.graphModality<ExampleVertexes, ExampleEdges>();

async function graphModalityExample() {
  try {
    client.transaction(async (trx) => {
      await client.createVertexType("User", trx, {
        ifNotExists: true,
      });
      await client.createEdgeType("Friends", trx, {
        ifNotExists: true,
      });

      const [vertex1, vertex2] = await client.newVertex("User", trx, {
        data: [
          {
            name: "John",
          },
          {
            name: "Jane",
          },
        ],
      });

      const edge = await client.newEdge(
        "Friends",
        vertex1["@rid"],
        vertex2["@rid"],
        trx,
        {
          data: {
            since: new Date().getDate(),
          },
        }
      );

      console.log({
        vertex1,
        vertex2,
        edge,
      });
    });
  } catch (error) {
    throw new Error(`There was a problem while running the example.`, {
      cause: error,
    });
  }
}

graphModalityExample();
```

The output of should look similar to this, perhaps with different values for the `@rid`'s and the edge's `since` property. Notice how the edge's `@in` and `@out` properties match the `@rid` properties of the vertex records.

```
{
  vertex1: { '@rid': '#1:2', '@type': 'User', '@cat': 'v', name: 'John' },
  vertex2: { '@rid': '#4:2', '@type': 'User', '@cat': 'v', name: 'Jane' },
  edge: {
    '@rid': '#25:2',
    '@type': 'Friends',
    '@cat': 'e',
    '@in': '#4:2',
    '@out': '#1:2',
    since: 31
  }
}
```

<h4 id="conclusion">Conclusion</h4>

If there are no errors during execution, you should be able to navigate to the [web based interface for ArcadeDB](https://docs.arcadedb.com/#Studio), and see your records in the database. You may find the `GraphModality.selectFrom()` method useful also.

Note You can verify the existence of a database on the server by utilizing one of the following:

- SpriteServer.listDatabases()
- SpriteServer.databaseExists()
- [ArcadeDB server console](https://docs.arcadedb.com/#Console).

<h4 id="next">What is next?</h4>

The next section will demonstrate how to use the `SpriteDatabase` module to perform operations on the database.
