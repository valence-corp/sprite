import { SpriteDatabase } from "../SpriteDatabase.js";
import { ModalityBase } from "./ModalityBase.js";
import {
  ISpriteCreateTypeOptions,
  ISpriteInsertRecordOptions,
  SpriteTransactionCallback,
  TypeNames,
} from "../types/database.js";
import { SpriteOperations } from "../SpriteOperations.js";
import { SpriteType } from "../SpriteType.js";
import { SpriteTransaction } from "../SpriteTransaction.js";
import {
  ISpriteEdgeOptions,
  SpriteEdgeVertexDescriptor,
} from "../types/edge.js";
import { ArcadeTransactionIsolationLevel } from "../types/transaction.js";

/**
 * A window to a specific graph set.
 * Mandatory type parameters for the graph elements to target.
 * @param {SpriteDatabase} client The instance of SpriteDatabase to target
 * @param {SpriteOperations} operators The operators instance to use
 */
class GraphModality<V, E> extends ModalityBase<V & E> {
  constructor(
    client: SpriteDatabase,
    operators: SpriteOperations,
    transaction?: SpriteTransaction
  ) {
    super(client, operators);
  }
  /**
   * Insert a new vertex into the database.
   * @param {string} type The type of vertex to create. It must be a type that currently exists in the schema
   * @param {ISpriteInsertRecordOptions} options The options for the vertex insertion.
   * @returns {SpriteRecord} The record that is created in the database.
   * @see createVertexType()
   * @see transaction()
   * @example
   * // non-idempotent operations must be conducted within a transaction
   * client.transaction(async (trx)=>{
   *   // to create a vertex, a type must be created first
   *   await client.createType('aVertex', trx);
   *   const vertex = await client.newVertex('aVertex', trx, {
   *     aProperty: 'aValue',
   *   });
   *   console.log(vertex);
   *   // {
   *   //   '@rid': '#0:0',
   *   //   '@cat': 'v',
   *   //   '@type': 'aVertex',
   *   //   'aProperty': 'aValue'
   *   // }
   * });
   *
   * // NOTE: you could control the transaction manually
   * const trx = await database.newTransaction();
   * client.setTransaction(trx);
   * await client.createType('aVertex', trx);
   * const vertex = await client.newVertex('aVertex', trx, {
   *   aProperty: 'aValue',
   * });
   * trx.commit();
   * // ...
   */
  newVertex = async <N extends TypeNames<V>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteInsertRecordOptions<V[N]>
  ) => this._operators.insertRecord<V, N>(typeName, transaction, options);
  /**
   * Insert a new edge into the database.
   * @param {string} type The type of edge to create. It must be a type that currently exists in the schema.
   * @param {SpriteEdgeVertexDescriptor} to The vertex to which to create the edge.
   * @param {SpriteEdgeVertexDescriptor} from The vertex from which to create the edge.
   * @see createEdgeType()
   * @see transaction()
   * @param {ISpriteInsertRecordOptions} options The options for the edge insertion.
   * @returns {SpriteRecord} The record that is created in the database.
   * @example
   * // non-idempotent operations must be conducted within a transaction
   * client.transaction(async ()=>{
   *   // to create a edge, a type must be created first
   *   await client.createType('anEdge');
   *   const edge = await client.newEdge('anEdge', '#0:0', "#1:0", {
   *     aProperty: 'aValue',
   *   });
   *   console.log(edge.data);
   *   // {
   *   //   '@rid': '#3:0',
   *   //   '@cat': 'e',
   *   //   '@type': 'anEdge',
   *   //   '@in': '#0:0',
   *   //   '@out': '#1:0',
   *   //   aProperty: 'aValue'
   *   // }
   * });
   *
   * // NOTE: you could control the transaction manually
   * const trx = await database.newTransaction();
   * client.setTransaction(trx);
   * await client.createType('anEdge', trx);
   * const edge = await client.newEdge('anEdge', trx, {
   *   aProperty: 'aValue',
   * });
   * trx.commit();
   * // ...
   */
  newEdge = async <
    N extends TypeNames<E>,
    V1 extends keyof V,
    V2 extends keyof V
  >(
    typeName: N,
    to: SpriteEdgeVertexDescriptor<V, V1>,
    from: SpriteEdgeVertexDescriptor<V, V2>,
    transaction: SpriteTransaction,
    options?: ISpriteEdgeOptions<E[N]>
  ) =>
    this._operators.createEdge<E, V, N, V1, V2>(
      typeName,
      to,
      from,
      transaction!,
      options
    );
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
   * Create a new edge type.
   * @param {TypeInRecordCategory} typeName The name of the type to create.
   * @param {ISpriteCreateTypeOptions} options Options to create the type with.
   * @returns {SpriteType} an instance of SpriteType.
   * @throws `Error` if the type could not be created.
   * @note non-idempotent commands (such a creating types) must be issued as part of a transaction
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'root',
   *   password: 'rootPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * const client = database.graph<VertexTypes, EdgeTypes>();
   *
   * async function createEdgeTypeExample() {
   *   try {
   *     // non-idempotent operations must be conducted within a transaction
   *     client.transaction(async (trx)=>{
   *       const type = await client.createEdgeType('aType', trx);
   *       console.log(type.name);
   *       // 'aType'
   *     });
   *   } catch (error) {
   *     // handle error conditions
   *     console.error(error);
   *   }
   * };
   *
   * createEdgeTypeExample();
   *
   * // NOTE: you could control the transaction manually
   * const trx = await database.newTransaction();
   * const type = await client.createEdgeType('aType', trx);
   * trx.commit();
   */
  createEdgeType = async <N extends TypeNames<E>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteCreateTypeOptions<E, N>
  ) => this._operators.createType<E, N>(typeName, "edge", transaction, options);
  /**
   * Create a new vertex type.
   * @param {TypeInRecordCategory} typeName The name of the type to create.
   * @param {ISpriteCreateTypeOptions} options Options to create the type with.
   * @returns {SpriteType} an instance of SpriteType.
   * @throws `Error` if the type could not be created.
   * @note non-idempotent commands (such a creating types) must be issued as part of a transaction
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'root',
   *   password: 'rootPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * const client = database.graph<VertexTypes, EdgeTypes>();
   *
   * async function createVertexTypeExample() {
   *   try {
   *     // non-idempotent operations must be conducted within a transaction
   *     client.transaction(async (trx)=>{
   *       const type = await client.createVertexType('aType', trx);
   *       console.log(type.name);
   *       // 'aType'
   *     });
   *   } catch (error) {
   *     // handle error conditions
   *     console.error(error);
   *   }
   * };
   *
   * createVertexTypeExample();
   *
   * // NOTE: you could control the transaction manually
   * const trx = await database.newTransaction();
   * const type = await client.createVertexType('aType', trx);
   * trx.commit();
   */
  createVertexType = async <N extends TypeNames<V>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteCreateTypeOptions<V, N>
  ): Promise<SpriteType<V, N>> =>
    this._operators.createType<V, N>(typeName, "vertex", transaction, options);
}

export { GraphModality };
