import { SpriteDatabase } from "../SpriteDatabase.js";
import { ModalityBase } from "./ModalityBase.js";
import {
  ISpriteCreateTypeOptions,
  ISpriteInsertRecordOptions,
  TypeNames,
} from "../types/database.js";
import { SpriteType } from "../SpriteType.js";
import { SpriteTransaction } from "../SpriteTransaction.js";
import {
  ISpriteEdgeOptions,
  SpriteEdgeVertexDescriptor,
} from "../types/edge.js";
import { SqlDialect } from "../SqlDialect.js";

/**
 * A window to a specific graph set.
 * Mandatory type parameters for the graph elements to target.
 * @param {SpriteDatabase} client The instance of SpriteDatabase to target
 * @param {SpriteOperations} operators The operators instance to use
 */
class GraphModality<V, E> extends ModalityBase<V & E> {
  constructor(client: SpriteDatabase, dialect: SqlDialect) {
    super(client, dialect);
  }
  /**
   * Insert a new vertex into the database.
   * @param {string} type The type of vertex to create. It must be a type that currently exists in the schema
   * @param {ISpriteInsertRecordOptions} options The options for the vertex insertion.
   * @returns {SpriteRecord} The record that is created in the database.
   * @see createVertexType()
   * @see transaction()
   * @example
   *
   * const db = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aSpriteDatabase'
   * });
   *
   * type VertexTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * type EdgeTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * const client = db.graphModality<VertexTypes, EdgeTypes>();
   *
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
   */
  newVertex = async <N extends TypeNames<V>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteInsertRecordOptions<V[N]>,
  ) => this._sql.insertRecord<V, N>(typeName, transaction, options);
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
   *
   * const db = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aSpriteDatabase'
   * });
   *
   * type VertexTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * type EdgeTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * const client = db.graphModality<VertexTypes, EdgeTypes>();
   *
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
   */
  newEdge = async <
    N extends TypeNames<E>,
    V1 extends keyof V,
    V2 extends keyof V,
  >(
    typeName: N,
    to: SpriteEdgeVertexDescriptor<V, V1>,
    from: SpriteEdgeVertexDescriptor<V, V2>,
    transaction: SpriteTransaction,
    options?: ISpriteEdgeOptions<E[N]>,
  ) =>
    this._sql.createEdge<E, V, N, V1, V2>(
      typeName,
      to,
      from,
      transaction!,
      options,
    );
  /**
   * Create a new edge type.
   * @param {TypeInRecordCategory} typeName The name of the type to create.
   * @param {ISpriteCreateTypeOptions} options Options to create the type with.
   * @returns {SpriteType} an instance of SpriteType.
   * @throws `Error` if the type could not be created.
   * @note non-idempotent commands (such a creating types) must be issued as part of a transaction
   * @example
   *
   * const db = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aSpriteDatabase'
   * });
   *
   * type VertexTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * type EdgeTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * const client = db.graphModality<VertexTypes, EdgeTypes>();
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
   */
  createEdgeType = async <N extends TypeNames<E>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteCreateTypeOptions<E, N>,
  ) => this._sql.createType<E, N>(typeName, "edge", transaction, options);
  /**
   * Create a new vertex type.
   * @param {TypeInRecordCategory} typeName The name of the type to create.
   * @param {ISpriteCreateTypeOptions} options Options to create the type with.
   * @returns {SpriteType} an instance of SpriteType.
   * @throws `Error` if the type could not be created.
   * @note non-idempotent commands (such a creating types) must be issued as part of a transaction
   * @example
   *
   * const db = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aSpriteDatabase'
   * });
   *
   * type VertexTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * type EdgeTypes = {
   *   aType: {
   *     aProperty: string
   *   }
   * }
   *
   * const client = db.graphModality<VertexTypes, EdgeTypes>();
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
   */
  createVertexType = async <N extends TypeNames<V>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteCreateTypeOptions<V, N>,
  ): Promise<SpriteType<V, N>> =>
    this._sql.createType<V, N>(typeName, "vertex", transaction, options);
}

export { GraphModality };
