import { ISpriteInsertRecordOptions } from "./database.js";
import { ISpriteEdgeOptions } from "./edge.js";

/**
 * isolationLevel is the isolation level for the current transaction,
 * either `READ_COMMITTED` or `REPEATABLE_READ`. For details on what
 * isolation level dictates about the transaction, see the [ArcadeDB
 * documentation](https://docs.arcadedb.com/#HTTP-Begin)
 * @default READ_COMMITTED
 */
export type ArcadeTransactionIsolationLevel =
  | 'READ_COMMITTED'
  | 'REPEATABLE_READ';

export interface ISpriteTransactionInsertRecordOptions<T>
  extends Omit<ISpriteInsertRecordOptions<T>, 'transactionId'> {}

export interface ISpriteTransactionCreateEdgeOptions<D>
  extends Omit<ISpriteEdgeOptions<D>, 'transactionId'> {}