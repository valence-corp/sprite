---
layout: tutorial
permalink: /tutorials/transactions.html
title: Sprite Tutorials - Database Transactions
name: Transactions
prevDesc: Create a Database
prevUrl: /tutorials/createDatabase.html
nextDesc: Create a Document
nextUrl: /tutorials/createDocument.html
---

### Transactions

---

**Note:** This tutorial assumes prior experience with transactional databases. If you're new to this topic, it may be challenging, but it's essential to understand how to use Sprite properly.

**Important:** You don't need to run this code; it will be put into practice in the next tutorial.

---

ArcadeDB is a transactional database. This is preferred for applications that require a high level of data integrity. Non-idempotent operations (which is a technical way of saying "operations that can change the database") must be part of a transaction.

In ArcadeDB (and Sprite) commands are non-idempotent, and queries are idempotent. Commands, therefore, are required to be issued as part of a transaction. Sprite contains many methods that are built as abstractions over commands (for example: `createType`, `createDocument`, or `deleteOne`). They still use the `SpriteDatabase.command` method internally, and as a result must be performed as part of a transaction.

Is Sprite you can manually control how transactions are accomplished, use the `SpriteDatabase.transaction` method (which incorporates some abstraction to reduce boilerplate), or use the helpers on the `SpriteTransaction` class. This tutorial will demonstate these methods, and explain why they are implemented as such in Sprite.

#### Overview

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteDatabase](#instantiating)
3. [Manual Transactions](#manual)
4. [Transaction Helper](#help)
5. [Why?](#why)
6. [Conclusion](#conclusion)
7. [What is next](#next)

#### Prerequisites
---------------

1. Ensure you have completed the [installation](../installation.html) process, which includes installing ArcadeDB, running it, and accessing it from a TypeScript/JavaScript project with Sprite installed.
2. You have created a database called "ExampleDatabase", as accomplished in the [Create a Database tutorial](tutorials/createDatabase.html)

#### Instantiating SpriteDatabase
-----------------------------

Begin by inserting the following code into your project's `index.ts` file:

```ts
import { SpriteDatabase } from "@valence-corp/sprite";

const db = new SpriteDatabase({
  username: "aUsername", // root will be ok for this tutorial
  password: "aPassword", // your password,
  address: "http://localhost:2480", // default address for ArcadeDB
  databaseName: "ExampleDatabase", // the existing database
});
```

#### Manual Transactions
---------------------

The following code demonstrates manual transactions:

```ts
async function manualTransaction() {
  try {
    const transaction = await db.newTransaction();
    await db.command("sql", "CREATE document TYPE ExampleUnused", transaction);
    await db.commitTransaction(transaction.id);
    await db.rollbackTransaction(transaction.id);
  } catch (error) {
    throw new Error("There was an error during the example transaction", { cause: error });
  }
}
```

#### Transaction Helper
---------------------

The `SpriteDatabase.transaction` method reduces boilerplate for transactions:

```ts
async function transactionHelperExample() {
  try {
    const transaction = await db.transaction(async (trx) => {
      await db.command("sql", "CREATE document TYPE ExampleUnused", trx);
    });
    await transaction.rollback();
  } catch (error) {
    throw new Error("There was an error during the example transaction", { cause: error });
  }
}
```

#### Why?
-----------------------------------

Manually passing transactions allows for more control and flexibility, reducing resource consumption by avoiding the need to create a new instance of the client for each transaction.

#### Conclusion
----------

In this tutorial, we demonstrated how to work with transactions in Sprite. We covered manual transactions, transaction helpers, and the reasoning behind manually passing transactions.

#### What's Next?
--------------

In the next section, we will explore more advanced topics in Sprite.