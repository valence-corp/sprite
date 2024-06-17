---

layout: default

title: commitTransaction

permalink: /classes/SpriteDatabase/commitTransaction.html

---

### _SpriteDatabase_.commitTransaction

#### Interface

(**transactionId: *string***)

Commits a transaction on the server, provided a transaction id.
Provide the id obtained from the transaction returned from invoking
`SpriteDatabase.newTransaction()`.

#### Note

<p class="note">You can use the `SpriteTransaction.commit()` method directly.</p>

#### Example

```ts
async function commitTransactionExample() {
  try {
    const trx = await database.newTransaction();
    await database.command(
      'sql',
      'CREATE document TYPE aType',
      trx
    );
    console.log(trx.id);
    // 'AS-0000000-0000-0000-0000-00000000000'
    database.commitTransaction(trx.id);
    return trx;
  } catch (error) {
    console.log(error);
    // handle error conditions
  }
}

commitTransactionExample();
```

