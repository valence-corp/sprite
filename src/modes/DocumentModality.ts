import { SpriteDatabase } from "../SpriteDatabase.js";
import { ModalityBase } from "./ModalityBase.js";
import {
  ISpriteCreateTypeOptions,
  ISpriteInsertRecordOptions,
  TypeNames,
} from "../types/database.js";
import { SpriteTransaction } from "../SpriteTransaction.js";
import { SqlDialect } from "../SqlDialect.js";

/**
 * Handles the operations related to document records in the database.
 * It wraps the methods of the SpriteOperations class with types.
 * @param {SpriteDatabase} client The instance of Database to target
 * @param {SpriteOperations} operators The operators instance to use
 */
class DocumentModality<S> extends ModalityBase<S> {
  constructor(client: SpriteDatabase, dialect: SqlDialect) {
    super(client, dialect);
  }
  /**
   * Insert a new document into the database.
   * @param {string} type The type of document to create. It must be a type that currently exists in the schema.
   * @param {ISpriteInsertRecordOptions} options The options for the document insertion.
   * @returns {SpriteRecord} The record that is created in the database.
   * @see createType
   * @example
   *
   * const database = new Database({
   *   username: 'root',
   *   password: 'rootPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * interface DocumentTypes {
   *   aDocument: {
   *     aProperty: string
   *   }
   * }
   *
   * const client = database.documents<DocumentTypes>();
   *
   * // non-idempotent operations must be conducted within a transaction
   * client.transaction(async (trx)=>{
   *   // to create a document, a type must be created first
   *   await client.createType('aDocument', trx);
   *   const document = await client.newDocument('aDocument', trx, {
   *     aProperty: 'aValue',
   *   });
   *   console.log(document);
   *   // {
   *   //   '@rid': '#0:0',
   *   //   '@cat': 'd',
   *   //   '@type': 'aDocument',
   *   //   aProperty: 'aValue'
   *   // }
   * });
   */
  newDocument = <N extends keyof S>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteInsertRecordOptions<S[N]>
  ) => this._sql.insertRecord<S, N>(typeName, transaction, options);
  /**
   * Create a new document type in the schema.
   * @param {TypeInRecordCategory} typeName The name of the type to create.
   * @param {ISpriteCreateTypeOptions} options Options to create the type with.
   * @returns {SpriteType} an instance of SpriteType.
   * @throws `Error` if the type could not be created.
   * @note non-idempotent commands (such a creating types) must be issued as part of a transaction
   * @example
   *
   * const database = new Database({
   *   username: 'root',
   *   password: 'rootPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * interface DocumentTypes {
   *   aDocument: {
   *     aProperty: string
   *   }
   * }
   *
   * const client = database.documents<DocumentTypes>();
   *
   * async function createDocumentTypeExample() {
   *   try {
   *     // non-idempotent operations must be conducted within a transaction
   *     client.transaction(async (trx)=>{
   *       const type = await client.createType('aDocument', trx);
   *       console.log(type.name);
   *       // 'aType'
   *     });
   *   } catch (error) {
   *     // handle error conditions
   *     console.error(error);
   *   }
   * };
   *
   * createDocumentTypeExample();
   */
  createType = <N extends TypeNames<S>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteCreateTypeOptions<S, N>
  ) => this._sql.createType<S, N>(typeName, "document", transaction, options);
}

export { DocumentModality };
