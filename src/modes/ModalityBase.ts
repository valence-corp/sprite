import {
  ISpriteDeleteFromOptions,
  ISpriteDropTypeOptions,
  ISpriteSelectFromOptions,
  OmitMeta,
  SpriteTransactionCallback,
  TypeNames,
  WithRid,
} from "../types/database.js";
import {
  ArcadeTransactionIsolationLevel,
  SpriteTransaction,
} from "../SpriteTransaction.js";
import { SpriteDatabase } from "../SpriteDatabase.js";
import { SpriteOperations } from "../SpriteOperations.js";

class ModalityBase<S> {
  protected _database: SpriteDatabase;
  protected _operators: SpriteOperations;
  constructor(client: SpriteDatabase, operators: SpriteOperations) {
    this._database = client;
    this._operators = operators;
  }
  selectFrom = async <N extends TypeNames<S>, P extends keyof WithRid<S, N>>(
    typeName: N,
    options?: ISpriteSelectFromOptions<S, N, P>
  ) => {
    return this._operators.selectFrom<S, N, P>(typeName, options);
  };
  dropType = async <N extends TypeNames<S>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteDropTypeOptions
  ) => this._operators.dropType<S, N>(typeName, transaction, options);
  newTransaction = (isolationLevel?: ArcadeTransactionIsolationLevel) =>
    this._database.newTransaction(isolationLevel);
  /**
   * Helps to manage a transaction, by automatically invoking `newTransation`,
   * and passing the returned `SpriteTransaction` to a callback as an argument,
   * to be passed to non-idempotent databases operations.
   * @param {SpriteTransactionCallback} callback
   * @param {ArcadeTransactionIsolationLevel} isolationLevel
   * @returns {void} void
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * type DocTypes = {
   *   aType: {
   *     aField: string
   *   }
   * }
   *
   * const docs = database.documents<DocTypes>();
   *
   * async function transactionExample() {
   *   try {
   *     const transaction = await docs.transaction(async (trx) => {
   *       docs.createType('aType', trx);
   *     });
   *     console.log(transaction.id);
   *     // 'AS-0000000-0000-0000-0000-00000000000'
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * transactionExample();
   */
  transaction = async (
    callback: SpriteTransactionCallback,
    isolationLevel?: ArcadeTransactionIsolationLevel
  ): Promise<SpriteTransaction> => {
    try {
      const trx = await this.newTransaction(isolationLevel);
      await callback(trx);
      await trx.commit();
      return trx;
    } catch (error) {
      throw new Error(`Could not complete transaction.`, { cause: error });
    }
  };
  /**
   * Delete records of a certain type, target specific records
   * using the `where` property of the options argument.
   * @param typeName The typename of the record to delete.
   * @param {ISpriteDeleteFromOptions} options The options to configure the deleteFrom command.
   * @returns {number} The count of the records deleted.
   * @throws If the records could not be deleted.
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * type DocTypes = {
   *   aType: {
   *     aField: string
   *   }
   * }
   *
   * const docs = database.documents<DocTypes>();
   *
   * async function deleteFromExample() {
   *   try {
   *     await docs.transaction(async (trx) => {
   *       const result = await docs.deleteFrom('aType', trx, {
   *         where: ['aField', '!=', 'aValue']
   *       });
   *       console.log(result);
   *       // returns the number of records deleted
   *       // as a result of the operation
   *       // { count: x }
   *     });
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * deleteFromExample();
   */
  deleteFrom = async <N extends TypeNames<S>, P extends keyof WithRid<S, N>>(
    typeName: N,
    transaction: SpriteTransaction,
    options: ISpriteDeleteFromOptions<S, N, P>
  ) => this._operators.deleteFrom<S, N, P>(typeName, transaction, options);
  /**
   * Delete a specific record by providing the `rid`
   * @param {string} rid The RID of the record to delete.
   * @returns {boolean} `true` if the record was deleted.
   * @throws If the record was not deleted.
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * type DocTypes = {
   *   aType: {
   *     aField: string
   *   }
   * }
   *
   * const docs = database.documents<DocTypes>();
   *
   * async function deleteOneExample() {
   *   try {
   *     await docs.transaction(async (trx) => {
   *       const result = await docs.deleteOne('#0:0', trx);
   *       console.log(result);
   *       // number of records deleted as a result
   *       // of the operation
   *       // { count: 1 }
   *     });
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * deleteOneExample();
   */
  deleteOne = async (rid: string, transaction: SpriteTransaction) =>
    this._operators.deleteOne(rid, transaction);
  /**
   * Update one record in the database, by providing an RID.
   * @param {string} rid The RID of the record to update.
   * @param {object} data The data to replace within the record.
   * @param {SpriteTransaction} transaction The transaction to conduct the update operation within
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * type DocTypes = {
   *   aType: {
   *     aField: string
   *   }
   * }
   *
   * const docs = database.documents<DocTypes>();
   *
   * async function updateOneExample() {
   *   try {
   *     await docs.transaction(async (trx) => {
   *       const result = await docs.updateOne('#0:0', { aField: 'aValue' }, trx);
   *       console.log(result);
   *       // {
   *       //   '@rid': '#0:0',
   *       //   '@type': 'aType',
   *       //   '@cat': 'd',
   *       //   aField: 'aValue'
   *       // }
   *     });
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * updateOneExample();
   */
  updateOne = async <N extends TypeNames<S>>(
    rid: string,
    data: OmitMeta<S[N]>,
    transaction: SpriteTransaction
  ) => this._operators.updateOne<S, N>(rid, data, transaction);

  /**
   * Select a specific record by providing the `rid`
   * @param rid The RID of the record to select.
   * @returns {ArcadeRecord | ArcadeEdgeRecord} The ArcadeDB record (if it was found).
   * @throws If the record was not found.
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * type DocTypes = {
   *   aType: {
   *     aField: string
   *   }
   * }
   *
   * const docs = database.documents<DocTypes>();
   *
   * async function selectOneExample() {
   *   try {
   *     const result = await docs.selectOne<'aType'>('#0:0');
   *     console.log(result);
   *     // {
   *     //   '@rid': '#0:0',
   *     //   '@type': 'aType',
   *     //   '@cat': 'd',
   *     //   aField: 'aValue'
   *     // }
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * selectOneExample();
   */
  selectOne = async <N extends TypeNames<S>>(rid: string) =>
    this._operators.selectOne<S, N>(rid);
}

export { ModalityBase };