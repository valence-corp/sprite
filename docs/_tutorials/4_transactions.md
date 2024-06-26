---
layout: tutorial
permalink: /tutorials/transactions.html
title: Sprite Tutorials - Database Transactions
name: Transactions
prevDesc: Create a Database
prevUrl: /tutorials/createDatabase.html
nextDesc: Create a Document
nextUrl: /tutorials/createDocument.html
filename: 4_transactions.md
---

ArcadeDB is a transactional database. This is preferred for applications that require a high level of data integrity. Non-idempotent operations (which is a technical way of saying "operations that can change the database") must be part of a transaction.

In ArcadeDB (and Sprite) commands are non-idempotent, and queries are idempotent. Commands, therefore, are required to be issued as part of a transaction. Sprite contains many methods that are built as abstractions over commands (for example: `createType`, `createDocument`, or `deleteOne`). They still use the `SpriteDatabase.command` method internally, and as a result must be performed as part of a transaction.

There are a few different ways to conduct transactions in Sprite

1. Manually, with `newTransaction`, `commitTransaction`, and `rollbackTransaction`
2. The `SpriteDatabase.transaction` method (which incorporates some abstraction to reduce boilerplate)
3. The `SpriteTransaction` class itself has a `commit`, and a `rollback` method on it.

This tutorial will demonstate these methods, and explain why they are implemented as such in Sprite.

---

###### Note:

You don't need to run this code; it will be put into practice in the next tutorial.

---

#### Overview
---

1. [Prerequisites](#prerequisites)
2. [Instantiating SpriteDatabase](#instantiating-spritedatabase)
3. [Manual Transactions](#manual-transactions)
4. [Transaction Helper](#transaction-helper)
5. [SpriteTransaction](#spritetransaction)
6. [Why?](#why)
7. [Conclusion](#conclusion)
8. [What is next](#next)

#### Prerequisites
---

1. Ensure you have completed the [installation](./installation.html) process, which includes installing ArcadeDB, running it, and accessing it from a TypeScript/JavaScript project with Sprite installed.
2. You have created a database called "ExampleDatabase", as accomplished in the [Create a Database tutorial](./createDatabase.html)

#### Instantiating SpriteDatabase
---

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
---

The following code demonstrates manual transactions:

```ts
async function manualTransaction() {
  try {
    const transaction = await db.newTransaction();
    await db.command(
      "sql",
      "CREATE document TYPE ExampleUnused",
      transaction
    );
    await db.commitTransaction(transaction.id);
    await db.rollbackTransaction(transaction.id);
  } catch (error) {
    throw new Error(
      "There was an error during the example transaction",
      { cause: error }
    );
  }
}
```

#### Transaction Helper
---

The `SpriteDatabase.transaction` method reduces boilerplate for transactions:

```ts
async function transactionHelperExample() {
  try {
    const transaction = await db.transaction(async (trx) => {
      await db.command(
        "sql",
        "CREATE document TYPE ExampleUnused",
        trx
      );
    });
    await transaction.rollback();
  } catch (error) {
    throw new Error(
      "There was an error during the example transaction",
      { cause: error }
    );
  }
}
```

#### SpriteTransaction


It could be apparent from previous examples, but it is not strictly necessary to pass the transaction to another method in order to `commit` or `rollback`. The `SpriteTransaction` class has to shortcut these operations directly.

```ts
async function transactionHelperExample() {
  try {
    const transaction = await db.createTransaction();
    await db.command(
      "sql",
      "CREATE document TYPE ExampleUnused",
      transaction
    );
    await transaction.commit();
    await transaction.rollback();
  } catch (error) {
    throw new Error(
      "There was an error during the example transaction",
      { cause: error }
    );
  }
}
```

#### Why?
---

Manually passing transactions allows for more control and flexibility, and reduces resource consumption by avoiding the need to create a new instance of the client for each transaction. Some situations could necessitate using the manual rollback methods, but the abstractions are suitable for most.

#### Conclusion
---

In this tutorial, we demonstrated how to work with transactions in Sprite. We covered manual transactions, transaction helpers, and the reasoning behind manually passing transactions.

#### What's Next?
---

The next section explains the `DocumentModality`, which is an abstraction built over the database driver functionality of `SpriteDatabase`.