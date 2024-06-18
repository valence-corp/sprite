---

layout: default

title: rollbackTransaction

permalink: /classes/SpriteDatabase/rollbackTransaction.html

---

### _SpriteDatabase_.rollbackTransaction

#### Interface

(**transactionId: *string***)

Rolls back a transaction on the server. Provide the session id obtained with the `SpriteDatabase.newTransaction()` method.

#### Example

```ts
async function rollbackTransactionExample() {
  try {
    const trx = await database.newTransaction();
    await database.command(
      'sql',
      'CREATE document TYPE aType',
      trx
    );
    await trx.commit();
    console.log(trx.id);
    // 'AS-0000000-0000-0000-0000-00000000000'
    database.rollbackTransaction(trx.id);
    return trx;
  } catch (error) {
    console.log(error);
    // handle error conditions
  }
}

rollbackTransactionExample();
```

