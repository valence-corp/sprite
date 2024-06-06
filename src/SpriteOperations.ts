import { SpriteDatabase } from './SpriteDatabase.js';
import {
  ArcadeCommandResponse,
  ArcadeRecordType,
  ISpriteCreateTypeOptions,
  ISpriteDeleteFromOptions,
  ISpriteDropTypeOptions,
  ISpriteInsertRecordOptions,
  ISpriteSelectFromOptions,
  OmitMeta,
  TypeNames,
  WithRid,
} from './types/database.js';
import { SpriteCommand } from './SpriteCommand.js';
import {
  ArcadeDeleteReturnCount,
  ArcadeResultSortDirection,
  ArcadeSelectTimeoutStrategy,
} from './nodes/types.js';
import { nodes } from './nodes/index.js';
import { SpriteType, ValidSuperTypeKey } from './SpriteType.js';
import { SpriteTransaction } from './SpriteTransaction.js';
import {
  ArcadeCreateEdgeResponse,
  ArcadeCreateTypeResponse,
  ArcadeDeleteFromResponse,
  ArcadeUpdateOneResponse,
  DeleteFromCount,
  RecordOperationResponse,
} from './types/operators.js';
import { validation } from './validation/ArcadeParameterValidation.js';
import {
  ISpriteEdgeOptions,
  SpriteEdgeVertexDescriptor,
} from './types/edge.js';

class SpriteOperations {
  database: SpriteDatabase;
  private _validate = validation;
  private _nodes = nodes;
  constructor(database: SpriteDatabase) {
    this.database = database;
  }
  /**
   * Create a type in the database.
   * @param {string} typeName The name of the type to create
   * @param {ArcadeRecordType} recordType The type of record to create (`document`, `edge`, or `vertex`)
   * @param {SpriteTransaction} transaction
   * @param {ISpriteCreateTypeOptions} options
   * @returns {SpriteType} an instance of SpriteType for the created type.
   */
  createType = async <S, N extends TypeNames<S>>(
    typeName: N,
    recordType: ArcadeRecordType,
    transaction: SpriteTransaction,
    options?: ISpriteCreateTypeOptions<S, N>,
  ) => {
    try {
      // CREATE <DOCUMENT|VERTEX|EDGE> TYPE <type>
      // [ IF NOT EXISTS ]
      // [EXTENDS <super-type>] [BUCKET <bucket-id>[,]*] [BUCKETS <total-bucket-number>]

      this._validate.transaction(transaction);
      this._validate.typeName(typeName);

      const createTypeCommand = new SpriteCommand({
        initial: this._nodes.create.type.create(recordType),
      });

      createTypeCommand.append<TypeNames<S>>(
        this._nodes.create.type.type,
        typeName,
      );

      if (options?.ifNotExists) {
        createTypeCommand.append<boolean>(
          this._nodes.create.type.ifNotExists,
          options.ifNotExists,
        );
      }

      if (options?.extends) {
        createTypeCommand.append<ValidSuperTypeKey<S, N>>(
          this._nodes.create.type.superType,
          options.extends,
        );
      }

      if (options?.buckets) {
        createTypeCommand.append<Array<string> | string>(
          this._nodes.create.bucket,
          options.buckets,
        );
      }

      if (options?.totalBuckets) {
        createTypeCommand.append<number>(
          this._nodes.create.type.totalBuckets,
          options.totalBuckets,
        );
      }

      const response = await this._command<ArcadeCreateTypeResponse>(
        createTypeCommand.toString(),
        transaction,
      );
      if (response[0].typeName === typeName) {
        return this.type<S, N>(typeName);
      } else {
        throw new Error(
          `Received an unexpected response from the server when attempting to create type: ['${
            typeName as string
          }'], of recordType: ['${recordType as string}'], into database ['${
            this.database.name
          }']`,
        );
      }
    } catch (error) {
      throw new Error(
        `Unable to create type: ['${typeName as string}'], in database: ['${
          this.database.name
        }']`,
        { cause: error },
      );
    }
  };
  /**
   * Returns an instance of `SpriteType` for the provided `typeName`.
   * @see SpriteType
   * @param {string} typeName The name of the type to target
   * @returns {SpriteType} An instance of `SpriteType`.
   */
  type = <S, N extends TypeNames<S>>(typeName: N): SpriteType<S, N> =>
    new SpriteType<S, N>(this.database, typeName);
  /**
   * Create a new edge, of a specified type, in the database.
   * @note The type must be created before a record can be created.
   * @param {string} type The type of edge to create.
   * @param {SpriteEdgeVertexDescriptor} from The starting vertex of the edge. It can be either the rid of the vertex (`@44:9`), or an index described by an object (`{type: 'user', key: 'name', value: 'Jeremiah'}`).
   * @param {SpriteEdgeVertexDescriptor} to The starting vertex of the edge. It can be either the rid of the vertex (`@44:9`), or an index described by an object (`{type: 'car', key: 'color', value: 'yellow'}`).
   * @param {SpriteTransaction} transaction The transaction to create the edge within.
   * @param {ISpriteEdgeOptions} options The options to create the edge with
   * @return {ArcadeEdgeRecord} The record that is created in the database.
   */
  createEdge = async <
    E,
    V,
    N extends TypeNames<E>,
    V1 extends TypeNames<V>,
    V2 extends TypeNames<V>,
  >(
    type: N,
    from: SpriteEdgeVertexDescriptor<V, V1>,
    to: SpriteEdgeVertexDescriptor<V, V2>,
    transaction: SpriteTransaction,
    options?: ISpriteEdgeOptions<E[N]>,
  ): Promise<E[N]> => {
    // CREATE EDGE <type> [BUCKET <bucket>] [UPSERT] FROM <rid>|(<query>)|[<rid>]* TO <rid>|
    // (<query>)|[<rid>]*
    // [UNIDIRECTIONAL]
    // [IF NOT EXISTS]
    // [SET <field> = <expression>[,]*]|CONTENT {<JSON>}
    // [RETRY <retry> [WAIT <pauseBetweenRetriesInMs]] [BATCH <batch-size
    // >]
    try {
      this._validate.transaction(transaction);
      const createEdgeCommand = new SpriteCommand({
        initial: this._nodes.create.edge.createEdge<N>(type),
      });

      if (options?.bucket) {
        createEdgeCommand.append(this._nodes.create.bucket, options.bucket);
      }

      if (options?.upsert) {
        createEdgeCommand.append<boolean>(
          this._nodes.create.edge.upsert,
          options.upsert,
        );
      }

      createEdgeCommand.append<SpriteEdgeVertexDescriptor<V, V1>>(
        this._nodes.create.edge.from,
        from,
      );
      createEdgeCommand.append<SpriteEdgeVertexDescriptor<V, V2>>(
        this._nodes.create.edge.to,
        to,
      );

      if (options?.unidirectional) {
        createEdgeCommand.append<boolean>(
          this._nodes.create.edge.unidirectional,
          options.unidirectional,
        );
      }

      if (options?.ifNotExists) {
        createEdgeCommand.append<boolean>(
          this._nodes.create.edge.ifNotExists,
          options.ifNotExists,
        );
      }

      if (options?.data) {
        createEdgeCommand.append<OmitMeta<E[N]>>(
          this._nodes.create.edge.content,
          options.data,
        );
      }
      if (options?.retry?.attempts) {
        createEdgeCommand.append<number>(
          this._nodes.create.edge.retry,
          options.retry.attempts,
        );
      }

      if (options?.retry?.wait) {
        createEdgeCommand.append<number>(
          this._nodes.create.edge.wait,
          options.retry.wait,
        );
      }

      if (options?.batchSize) {
        createEdgeCommand.append<number>(
          this._nodes.create.edge.batchSize,
          options.batchSize,
        );
      }

      const result = await this._command<ArcadeCreateEdgeResponse<E, N>>(
        createEdgeCommand.toString(),
        transaction,
      );

      if (result[0]) {
        return result[0];
      } else {
        throw new Error(
          `Received an unexpected response from the server when attempting to create edge of type: ${
            type as string
          }, with content: ${JSON.stringify(options?.data)}, into database '${
            this.database.name
          }'`,
        );
      }
    } catch (error) {
      throw Error(`Unable to build CREATE EDGE sql command.`, {
        cause: error,
      });
    }
  };
  /**
   * Insert a new record, of a specified type, in the database. This can be used to create both document, and vertex records.
   * @note The type must be created before a record can be created.
   * @param {string} typeName The type of the record to create.
   * @param {SpriteTransaction} transaction The transaction to create the record within.
   * @param {ISpriteInsertRecordOptions} options The options to insert the record with.
   * @return {ArcadeRecord} The record that is created in the database.
   */
  insertRecord = async <S, N extends TypeNames<S>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteInsertRecordOptions<S[N]>,
  ): Promise<S[N]> => {
    this._validate.transaction(transaction);
    // INSERT INTO [TYPE:]<type>|BUCKET:<bucket>
    // [CONTENT {<JSON>}|[{<JSON>}[,]*]]
    const insertIntoCommand = new SpriteCommand({
      initial: this._nodes.insert.record.insertInto<string>(
        options?.bucket
          ? this._nodes.insert.record.bucket(options.bucket)
          : (typeName as string),
      ),
    });

    if (options?.data) {
      insertIntoCommand.append<OmitMeta<S[N]>>(
        this._nodes.insert.record.content,
        options.data,
      );
    }

    const result = await this._command<S[N][]>(
      insertIntoCommand.toString(),
      transaction,
    );

    if (result[0]) {
      return result[0];
    } else {
      throw new Error(
        `Received an unexpected response from the server when attempting to create record of type: ${
          typeName as string
        }, with content: ${JSON.stringify(options?.data)}, into database '${
          this.database.name
        }'`,
      );
    }
  };
  /**
   * Removes an existing type from the schema. Does not remove the property values
   * in the records, it just changes the schema information (existing records
   * keep their existing property values).
   * @param {string} typeName The name of the type to drop.
   * @param {ISpriteDropTypeOptions} options The options to perform to drop the type with.
   * @returns `true` if the type was successfully dropped.
   * @throws `Error` if the type could not be dropped.
   */
  dropType = async <S, N extends TypeNames<S>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteDropTypeOptions,
  ) => {
    try {
      this._validate.transaction(transaction);
      // DROP TYPE <type> [UNSAFE] [IF EXISTS]
      const dropTypeCommand = new SpriteCommand({
        initial: this._nodes.drop.type.drop<N>(typeName),
      });

      if (options?.unsafe) {
        dropTypeCommand.append<boolean>(
          this._nodes.drop.type.unsafe,
          options.unsafe,
        );
      }

      if (options?.ifExists) {
        dropTypeCommand.append<boolean>(
          this._nodes.drop.type.ifExists,
          options.ifExists,
        );
      }

      const result = await this._command<any>(
        dropTypeCommand.toString(),
        transaction,
      );

      if (result) {
        return true;
      } else {
        throw new Error(
          `Received an unexpected response from the server: ${JSON.stringify(
            result,
          )}`,
        );
      }
    } catch (error) {
      throw new Error(
        `Unable to drop type [${typeName as string}] from database [${
          this.database.name
        }]`,
        { cause: error },
      );
    }
  };
  /**
   * Perform a `DELETE FROM` sql command by providing a typename and options.
   * @param {string} typeName The name of the type to generate a `DELETE FROM` command for.
   * @param {ISpriteDeleteFromOptions} options The options to perform the command with
   * @returns An array containing the results of the query.
   */
  deleteFrom = async <S, N extends TypeNames<S>, P extends keyof WithRid<S, N>>(
    typeName: N,
    transaction: SpriteTransaction,
    options?: ISpriteDeleteFromOptions<S, N, P>,
  ): Promise<DeleteFromCount> => {
    // DELETE FROM <Type> [RETURN <returning>]
    // [WHERE <Condition>*] [LIMIT <MaxRecords>] [TIMEOUT <MilliSeconds>] [UNSAFE]
    try {
      this._validate.transaction(transaction);
      // If there no options (like you want delete all the records of a certain type)
      // you must use backticks on the typeName, so this is a hack for now (TODO)
      const command = new SpriteCommand({
        initial: this._nodes.delete.from.delete<N>(
          options?.where ? typeName : (`\`${typeName as string}\`` as N),
        ),
      });

      if (options?.return) {
        command.append<ArcadeDeleteReturnCount>(
          this._nodes.delete.from.returnCount,
          options?.return,
        );
      }

      if (options?.where) {
        command.append(this._nodes.delete.from.where, options.where);
      }

      if (options?.limit) {
        command.append<number>(this._nodes.delete.from.limit, options.limit);
      }

      if (options?.timeout) {
        command.append<number>(
          this._nodes.delete.from.timeout,
          options.timeout,
        );
      }

      const result = await this._command<ArcadeDeleteFromResponse>(
        command.toString(),
        transaction,
      );
      if (result[0]) {
        return result[0];
      } else {
        throw new Error('Unexpected result from the the server.');
      }
    } catch (error) {
      throw new Error(
        `Could not delete record of type: ['${
          typeName as string
        }'], from database ['${this.database.name}'], where: ['${JSON.stringify(
          options?.where,
        )}'].`,
        { cause: error },
      );
    }
  };
  /**
   * A wrapper on the `SpriteDatabase.command()` method that handles
   * the response by automatically returning the result property
   * instead of returning the entire response. It is used to keep
   * the codebase DRY.
   */
  private _command = async <T>(
    command: string,
    transaction: SpriteTransaction,
  ): Promise<T> => {
    this._validate.transaction(transaction);
    const response = await this.database.command<T>(
      'sql',
      command,
      transaction,
    );
    if (response.result) {
      return response.result;
    }
    throw new Error(
      'No result property was present on the response from the server.',
    );
  };
  /**
   * A wrapper on the `SpriteDatabase.query()` method that handles
   * the response by automatically returning the result property
   * instead of returning the entire response. It is used to keep
   * the codebase DRY.
   */
  private _query = async <T>(command: string): Promise<T> => {
    const response = await this.database.query<T>('sql', command);
    if (response.result) {
      return response.result;
    }
    throw new Error(
      'No result property was present on the response from the server.',
    );
  };
  /**
   * Perform a `SELECT FROM` sql query by providing a typename and options.
   * @param {string} typeName The name of the type to generate a `SELECT FROM` query for.
   * @param {ISpriteSelectFromOptions} options The options to perform the query with
   * @returns An array containing the results of the query.
   */
  selectFrom = async <S, N extends TypeNames<S>, P extends keyof WithRid<S, N>>(
    typeName: N,
    options?: ISpriteSelectFromOptions<S, N, P>,
  ): Promise<Array<S[N]>> => {
    // SELECT [ <Projections> ] [ FROM <Target> (([ LET <Assignment>* ] ])) ( not implemented)
    // [ WHERE <Condition>* ]
    // (([ GROUP BY <Field>* ])) (not implemented)
    // [ ORDER BY <Fields>* [ ASC|DESC ] * ]
    // (([ UNWIND <Field>* ])) (not implemented)
    // [ SKIP <SkipRecords> ]
    // [ LIMIT <MaxRecords> ]
    // [ TIMEOUT <MilliSeconds> [ <STRATEGY> ] ]
    try {
      const command = new SpriteCommand({
        initial: this._nodes.select.from.selectFrom<N>(typeName),
      });

      if (options?.where) {
        command.append(this._nodes.select.from.where, options.where);
      }

      if (options?.orderBy) {
        command.append<keyof S[N]>(
          this._nodes.select.from.orderBy,
          options.orderBy.field,
        );
        if (options?.orderBy.direction) {
          command.append<ArcadeResultSortDirection>(
            this._nodes.select.from.direction,
            options.orderBy.direction,
          );
        }
      }

      if (options?.skip) {
        command.append<number>(this._nodes.select.from.skip, options.skip);
      }

      if (options?.limit) {
        command.append<number>(this._nodes.select.from.limit, options.limit);
      }

      if (options?.timeout) {
        command.append<number>(
          this._nodes.select.from.timeout,
          options.timeout.duration,
        );
        if (options?.timeout.strategy) {
          command.append<ArcadeSelectTimeoutStrategy>(
            this._nodes.select.from.strategy,
            options.timeout.strategy,
          );
        }
      }

      const result = await this._query<S[N][]>(command.toString());
      return result;
    } catch (error) {
      throw new Error(
        `Could not execute select command on type:${
          typeName as string
        } in database ${this.database.name}`,
        { cause: error },
      );
    }
  };
  /**
   * Select a record by providing the unique `@rid`.
   * @param {string} rid The rid of the record.
   * @returns {SpriteDocument | SpriteEdge | SpriteVertex } The record, if found.
   * @throws If the record could not be found.
   */
  selectOne = async <S, N extends TypeNames<S>>(rid: string): Promise<S[N]> => {
    try {
      const result = await this._query<S[N][]>(`SELECT FROM ${rid}`);
      return result[0];
    } catch (error) {
      throw new Error(
        `Could not select RID: [${rid}], from database ${this.database.name}.`,
        { cause: error },
      );
    }
  };
  /**
   * Delete a record by providing the `rid`
   * @param rid The RID of the record to delete.
   * @param {SpriteTransaction} transaction The transaction to conduct the operation within.
   * @returns {boolean} `true` if the record was deleted.
   * @throws If the record was not deleted.
   */
  deleteOne = async (
    rid: string,
    transaction: SpriteTransaction,
  ): Promise<DeleteFromCount> => {
    try {
      this._validate.transaction(transaction);
      const result = await this._command<ArcadeDeleteFromResponse>(
        `DELETE FROM ${rid}`,
        transaction,
      );
      switch (result[0].count) {
        case 1:
          return result[0];
        case 0:
          throw new Error(
            `No record found with rid: [${rid}], in database: [${this.database.name}]`,
          );
        default:
          throw new Error(
            `Unexpected result when deleting record by rid: [${rid}]`,
          );
      }
    } catch (error) {
      throw new Error(`Could not delete record: [${rid}]`, { cause: error });
    }
  };
  /**
   * Update a record by providing the `@rid`.
   * @param {string} rid The RID of the record to update.
   * @param {object} data The data to update the record with.
   * @returns {boolean} `true` if the record was updated.
   * @throws If the record was not updated.
   */
  updateOne = async <S, N extends TypeNames<S>>(
    rid: string,
    data: S[N],
    transaction: SpriteTransaction,
  ): Promise<RecordOperationResponse> => {
    // UPDATE <recordID>
    // [CONTENT <JSON>]
    // RETURN AFTER @this
    try {
      this._validate.transaction(transaction);
      const command = new SpriteCommand({
        initial: this._nodes.update.record.updateRecord(rid),
      });

      if (data) {
        command.append<S[N]>(this._nodes.update.record.content, data);
      }

      command.append<boolean>(this._nodes.update.record.returnAfter, true);

      const result = await this._command<ArcadeUpdateOneResponse>(
        command.toString(),
        transaction,
      );
      if (result[0]) {
        return result[0];
      } else {
        throw new Error(`No record with id [${rid}] found.`);
      }
    } catch (error) {
      throw new Error(
        `An error occured when attmepting to update record @rid: ${rid}, in database ${this.database.name}`,
        { cause: error },
      );
    }
  };
}

export { SpriteOperations };
