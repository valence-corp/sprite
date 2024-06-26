---

layout: default

title: newTransaction

permalink: /SpriteDatabase/newTransaction.html

---

### _SpriteDatabase_.newTransaction

#### Interface

(**isolationLevel: *ArcadeTransactionIsolationLevel***)

Begins a transaction on the server, managed as a session.

#### Example

```ts
async function transactionExample() {
  try {
    const trx = await database.newTransaction();
    await database.command(
      'sql',
      'CREATE document TYPE aType',
      trx
    );
    trx.commit();
    console.log(trx.id);
    // 'AS-0000000-0000-0000-0000-00000000000'
    return trx;
  } catch (error) {
    console.log(error);
    // handle error conditions
  }
}

transactionExample();
```

