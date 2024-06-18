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

###### Note

This tutorial could be challenging to users with no prior experience in transactional databases. There will be a lot of new information. It is, however, foundational to understand how to use Sprite properly.

_It is not necessary to run this code, it will be put into practice in the next tutorial._

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

<h4 id="prerequisites">Prerequisites</h4>

1. Ensure you have [the installation](../installation.html) completed. This means you have ArcadeDB installed, running, and accessible, as well as a TypeScript / JavaScript project with Sprite installed.
2. You have created a database called "ExampleDatabase", like accomplished in the [Create a Database tutorial](tutorials/createDatabase.html)

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

The following code is to be inserted under the database instantiation.

The `manualTransaction` function performs the following:

1. Creates a new transaction using `SpriteDatabase.newTransaction`. This returns an instance of `SpriteTransaction`.
2. Invokes `SpriteDatabase.command`, ensuring that the transaction is passed as an argument. This informs the database that you intend to issue this command during the transaction
3. Calls `SpriteDatabase.commitTransaction` with the transaction's `id` property. This causes the transaction to be carried out, and the type is inserted into the database.
4. Rollsback the transaction using `SpriteDatabase.rollbackTransaction`. This effectively reverses the transaction, and the type is removed from the database.

```ts
async function manualTransaction() {
  try {
    // create a new transaction
    // returns an instance of SpriteTransaction
    const transaction = await db.newTransaction();

    // All commands (idempotent, non-query) must
    // be part of a transaction, so the command method
    // requires a transaction argument
    await db.command("sql", "CREATE document TYPE ExampleUnused", transaction);

    // transaction is committed
    await db.commitTransaction(transaction.id);

    // transaction is rolledback
    await db.rollbackTransaction(transaction.id);
  } catch (error) {
    throw new Error("There was an error during the example transaction", {
      cause: error,
    });
  }
}
```

<h4 id="manual">Transaction Helper Method</h4>

The `SpriteDatabase.transaction` method reduces boilerplate for transactions. It accepts a callback as the only argument, that callback is passed a newly created `SpriteTransaction` as a function parameter (named `trx`, in this case). It is the job of the developer to place the non-idempotent operations inside of the callback, and pass them the transaction. The transaction method will the execute the callback, along with all operations inside of it, and then commit the transaction. It returns the `SpriteTransaction` in case it is needed, for instance to rollback later.

```ts
async function transactionHelperExample() {
  try {
    // create a new transaction
    // returns an instance of SpriteTransaction
    const transaction = await db.transaction(async (trx) => {
      // All commands (idempotent, non-query) must
      // be part of a transaction, so the command method
      // requires a transaction argument
      await db.command(
        "sql",
        "CREATE document TYPE ExampleUnused",
        trx
      );
    });

    // transaction is rolledback
    await transaction.rollback();

  } catch (error) {
    throw new Error("There was an error during the example transaction", {
      cause: error,
    });
  }
}
```

<h4 id="manual">SpriteTransaction Methods</h4>

It is important to add that `SpriteTransaction` has methods on it to commit, and rollback a transaction, this makes life a bit easier for developers.

```ts
async function spriteTransactionMethodsExample() {
  try {
    // create a new transaction
    // returns an instance of SpriteTransaction
    const transaction = await db.newTransaction();

    // any number of commands can be executed
    // with this transaction

    // transaction can be committed using
    // the methods on it
    await transaction.commit();

    // same for a rollback
    await transaction.rollback();

  } catch (error) {
    throw new Error("There was an error during the example transaction", {
      cause: error,
    });
  }
}
```

#### Why Manually Passing Transactions?

The reasoning for manually passing transactions, even in a transaction context, is that otherwise a new instance of a client would need to be created for each transaction. This way all operations can be conducted on the same instance of the client, which reduces resource consumption.