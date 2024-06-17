---
layout: tutorial
permalink: /tutorials/select.html
title: Sprite Tutorials - Select Records
name: Select Records
prevDesc: Introduction
prevUrl: /tutorials/introduction.html
nextDesc: Create a Database
nextUrl: /tutorials/createDatabase.html
---

### Database Transactions

ArcadeDB is a transactional database. This is preferred for applications that require a high level of data integrity. All non-idempotent operations (operations that can change the database) must be part of a transaction.

Sprite has various methods for orchestrating transactions. You can manually control how transactions are accomplished, or use `DocumentModality.transaction()` method, which incorporates some abstraction to reduce boilerplate. This tutorial will demonstate the methods of conducting transactions, and why they are implemented as such in Sprite.

#### Overview

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteDatabase](#instantiating)
3. [Manual Transactions](#manual)
4. [Transaction Helper](#help)
5. [Why?](#why)
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


<h4 id="manual">Manual Transactions</h4>

The following code is to be inserted under the database instantiation. The `manualTransaction` function creates a new transaction, issues a command using that transaction, and then commits the transaction. All commands are non-idempotent in ArcadeDB (and Sprite). Non-idempotent means that it can change the database, so things like CRUD operations.

```ts
async function manualTransaction() {
  try {
    // create a new transaction
    // returns an instance of SpriteTransaction
    const transaction = await db.newTransaction();

    // All commands (idempotent, non-query) must
    // be part of a transaction, so the command method
    // requires a transaction argument
    await db.command(
      'sql',
      'CREATE document TYPE ExampleUnused',
      transaction
    );

    // transaction is committed
    await db.commitTransaction(transaction.id);
    
    // transaction is rolledback
    await db.rollbackTransaction(transaction.id);

  } catch (error) {

  }
}

```


