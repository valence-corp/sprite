import {
  ArcadeCommandResponse,
  ArcadeGetSchemaResponse,
  ArcadeQueryResponse,
  ArcadeSqlExplanation,
  ArcadeSupportedQueryLanguages,
  AsArcadeEdges,
  AsArcadeRecords,
  ISpriteDatabaseClientParameters,
  ISpriteDatabaseConnectionParameters,
  SpriteAllowedParamValues
} from './types/database.js';
import { ArcadeDatabaseError } from './errors/ArcadeDatabaseError.js';
import { SpriteTransaction } from './SpriteTransaction.js';
import { endpoints } from './endpoints/database.js';
import { isNewClient } from './utilities/isNewClient.js';
import { SpriteRestClient } from './SpriteRestClient.js';
import { ArcadeTransactionIsolationLevel } from './types/transaction.js';
import { DocumentModality, GraphModality } from './api.js';
import { SqlDialect } from './SqlDialect.js';

/**
 * Interact with a database, perform queries, issue commands to manage
 * records, types, and settings.
 * @param {ISpriteDatabaseConnectionParameters} parameters The fields necessary to perform operations on a specific database.
 * @returns an instance of SpriteDatabase
 * @example
 *
 * const database = new SpriteDatabase({
 *   username: 'aUser',
 *   password: 'aPassword',
 *   address: 'http://localhost:2480',
 *   databaseName: 'aDatabase'
 * });
 *
 * type DocumentTypes = {
 *   aDocument: {
 *     aField: string
 *   }
 * }
 *
 * async function databaseExample() {
 *  const client = database.documents<DocumentTypes>();
 *   try {
 *     await client.transaction(async (trx) => {
 *       await client.createType('aDocument', trx);
 *       client.createDocument('aDocument', trx, {
 *         data: {
 *           aField: 'aValue'
 *         }
 *       })
 *     });
 *     const schema = await database.getSchema();
 *     console.log(schema);
 *     // [...]
 *   } catch (error) {
 *     console.log(error);
 *     // handle error conditions
 *   }
 * }
 *
 * databaseExample();
 */
class SpriteDatabase {
  /** The rest client, handles auth and connection details  */
  private _client: SpriteRestClient;
  /** Methods for performing SQL operations on the database. */
  private _sql: SqlDialect | undefined;
  /** The name of the database */
  private _name: string;
  /** Modality for operations involving document records */
  private _documentModality: DocumentModality<unknown> | undefined;
  /** Modality for operations involving vertex & edge records */
  private _graphModality: GraphModality<unknown, unknown> | undefined;
  constructor(parameters: ISpriteDatabaseClientParameters);
  constructor(parameters: ISpriteDatabaseConnectionParameters);
  constructor(
    parameters:
      | ISpriteDatabaseConnectionParameters
      | ISpriteDatabaseClientParameters
  ) {
    if (isNewClient(parameters)) {
      const { databaseName, ...clientParameters } =
        parameters as ISpriteDatabaseConnectionParameters;
      this._name = databaseName;
      this._client = new SpriteRestClient(clientParameters);
    } else {
      const { client, databaseName } =
        parameters as ISpriteDatabaseClientParameters;
      this._client = client;
      this._name = databaseName;
    }
  }
  /** The name of the database. */
  get name() {
    return this._name;
  }
  /**
   * Private getter for this._sql, to avoid
   * prematurly creating the sql dialect if they are not
   * needed.
   */
  private get sql() {
    if (!this._sql) {
      this._sql = new SqlDialect(this);
    }
    return this._sql;
  }
  /** Helper function for building enpoints */
  private _endpoint = (endpoint: string) => `${endpoint}/${this.name}`;
  /**
   * Returns a modality for working with document records within the database.
   * @returns {DocumentModality} A database document modality.
   */
  documentModality = <T>(): DocumentModality<AsArcadeRecords<T>> => {
    if (!this._documentModality) {
      this._documentModality = new DocumentModality<unknown>(this, this.sql);
    }
    return this._documentModality as DocumentModality<AsArcadeRecords<T>>;
  };
  /**
   * Returns a modality for working with graph records within the database.
   * @returns {GraphModality} A database graph modality.
   */
  graphModality = <V, E>(): GraphModality<
    AsArcadeRecords<V>,
    AsArcadeEdges<E>
  > => {
    if (!this._graphModality) {
      this._graphModality = new GraphModality<unknown, unknown>(this, this.sql);
    }
    return this._graphModality as GraphModality<
      AsArcadeRecords<V>,
      AsArcadeEdges<E>
    >;
  };
  // /**
  //  * @experimental
  //  * Returns a modality building SQL queries using method chaining.
  //  * @returns {ChainingModality} A database chaining modality.
  //  */
  // chainModality = <S>(): ChainingModality<S> =>
  //   new ChainingModality<S>(this, this.operators);
  /**
   * Executes a query against the target database. This method only executes
   * idempotent statements (that cannot change the database), namely `SELECT`
   * and `MATCH`. The execution of non-idempotent commands will throw an
   * `IllegalArgumentException` exception. If you are trying to execute
   * non-idempotent commands, see the `SpriteDatabase.command()` method.
   * @param {ArcadeSupportedQueryLanguages} language The language of the query.
   * @param {string} command The command to execute in the given language.
   * @param {Record<string,any>} params The key-value pairs of parameters to use in the query.
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * async function spriteQueryExample() {
   *   try {
   *     const result = await database.query(
   *       'sql',
   *       'SELECT FROM schema:types'
   *     );
   *     console.log(result);
   *     // {
   *     //   user: 'aUser',
   *     //   version: '24.x.x',
   *     //   serverName: 'ArcadeDB_0',
   *     //   result: [...]
   *     // }
   *   return result
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * spriteQueryExample();
   */
  query = async <ReturnType>(
    language: ArcadeSupportedQueryLanguages,
    command: string,
    params?: Record<string, SpriteAllowedParamValues>
  ): Promise<ArcadeQueryResponse<ReturnType[]>> => {
    const response = await this._client.fetch(this._endpoint(endpoints.query), {
      method: 'POST',
      body: JSON.stringify({
        language,
        command,
        params
      })
    });

    // 200 OK
    // 400 invalid language, invalid query
    // 500 database does not exist, cannot execute query
    // 403, 404 are handled by SpriteBase.fetch()

    switch (response.status) {
      case 200:
        return response.json();
      case 400:
        throw new Error(
          `Invalid language or query. Status: ${response.status}`
        );
      case 500: {
        const message = await response.json();
        throw new Error(
          `${message.error}. ${message.detail}. Status: ${response.status}`
        );
      }
      default:
        throw new Error(
          `Unknown error. Status: ${response.status}, StatusText: ${response.statusText}`
        );
    }
  };
  /**
   * Returns information about query execution planning of a specific statement,
   * without executing the statement itself.
   * @param {string} sql The SQL command to explain.
   * @returns {string} The explanation of the command.
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * async function spriteExplainExample() {
   *   try {
   *     const explanation = await client.explain("SELECT FROM schema:types");
   *     console.log(explanation);
   *     // {
   *     //   executionPlan: {
   *     //     type: 'QueryExecutionPlan',
   *     //     javaType: 'com.arcadedb.query.sql.executor.SelectExecutionPlan',
   *     //     cost: -1,
   *     //     prettyPrint: '+ FETCH DATABASE METADATA TYPES',
   *     //     steps: [ [Object] ]
   *     //   },
   *     //   executionPlanAsString: '+ FETCH DATABASE METADATA TYPES'
   *     // }
   *     return explanation;
   *   } catch (error) {
   *     console.error(error);
   *     // handle error conditions
   *   }
   * };
   *
   * spriteExplainExample();
   */
  explain = async (sql: string): Promise<ArcadeSqlExplanation> => {
    try {
      const response = await this.query<ArcadeSqlExplanation>(
        'sql',
        `EXPLAIN ${sql}`
      );
      if (response.result[0]) {
        return response.result[0];
      } else {
        throw new Error(`Unexpected result from server.`);
      }
    } catch (error) {
      throw new Error(
        `Could not retreive explanation from the server for ${sql}.`,
        { cause: error }
      );
    }
  };
  /**
   * Executes a command on the target database. This method only executes
   * non-idempotent statements (that can change the database), such as `INSERT`,
   * `CREATE`, and `DELETE`. The execution of idempotent commands will throw an
   * `IllegalArgumentException` exception.
   * 
   * Please note that not all non-idempotent commands require a transaction. For example,
   * schema updates are non-idempotent, but are also non-transactional.
   * 
   * If you are trying to execute
   * idempotent commands, see the `SpriteDatabase.query()` method.
   * @param {ArcadeSupportedQueryLanguages} language The language the command is written in.
   * @param {string} command The command to execute in the given language.
   * @param {SpriteTransaction} transaction The transaction to perform this command within.
   * @param {Record<string,any>} params The key-value pairs of parameters to use in the command.
   * @throw `Error` when it cannot execute the command.
   * @see SpriteDatabase.transaction()
   * @example
   *
   * const database = new SpriteDatabase({
   *   username: 'aUser',
   *   password: 'aPassword',
   *   address: 'http://localhost:2480',
   *   databaseName: 'aDatabase'
   * });
   *
   * async function spriteCommandExample() {
   *   try {
   *     // commands are non-idempotent, and must be
   *     // conducted as part of a transaction
   *     const transaction = await database.newTransaction();
   *     const result = await database.command(
   *       'sql',
   *       'CREATE document TYPE aType',
   *       transaction
   *     );
   *     transaction.commit();
   *     console.log(result);
   *     // {
   *     //  user: 'aUser',
   *     //  version: '24.x.x (build [...])',
   *     //  serverName: 'ArcadeDB_0',
   *     //  result: [ { operation: 'create document type', typeName: 'aType' } ]
   *     // }
   *     return result;
   *   } catch (error) {
   *     // handle error conditions
   *     console.error(error);
   *   }
   * };
   *
   * spriteCommandExample();
   */
  command = async <T>(
    language: ArcadeSupportedQueryLanguages,
    command: string,
    transaction?: SpriteTransaction
  ): Promise<ArcadeCommandResponse<T>> => {
    const response = await this._client.fetch(
      this._endpoint(endpoints.command),
      {
        method: 'POST',
        body: JSON.stringify({
          language,
          command
        }),
        headers: transaction
          ? { 'arcadedb-session-id': transaction.id }
          : undefined
      }
    );

    switch (response.status) {
      case 200:
        return response.json();
      // TODO: need to find an example of a command that returns 202
      // case 202:
      //  break;
      case 400:
        throw new Error(
          `Invalid language or command. Status: ${response.status}`
        );
      case 500:
        throw new ArcadeDatabaseError(await response.json());
      default:
        throw new Error(
          `Unknown error. Status: ${response.status}, StatusText: ${response.statusText}`
        );
    }
  };
  /**
   * Return the current schema.
   * @returns An array of objects describing the schema.
   * @example
   * async function getSchemaExample() {
   *   try {
   *     const schema = await database.getSchema();
   *     console.log(schema);
   *     // [...]
   *     return schema;
   *   } catch (error) {
   *     console.log(error);
   *     // handle error conditions
   *   }
   * }
   *
   * getSchemaExample();
   */
  getSchema = async (): Promise<ArcadeGetSchemaResponse[]> => {
    try {
      const response = await this.query<ArcadeGetSchemaResponse>(
        'sql',
        'SELECT FROM schema:types'
      );
      if (Array.isArray(response.result)) {
        return response.result;
      } else {
        throw new Error(
          `Unexpected result returned from the server when attemping to get the schema for ${this.name}`
        );
      }
    } catch (error) {
      throw new Error(`Could not get schema for database ${this.name}`, {
        cause: error
      });
    }
  };
  /**
   * Begins a transaction on the server, managed as a session.
   * @param {ArcadeTransactionIsolationLevel} isolationLevel The isolation level for the transaction, defaults to `READ_COMMITED`.
   * @returns {SpriteTransaction} An instance of a SpriteTransaction to be passed to methods that require it an argument.
   * @example
   *
   * async function transactionExample() {
   *   try {
   *     const trx = await database.newTransaction();
   *     await database.command(
   *       'sql',
   *       'CREATE document TYPE aType',
   *       trx
   *     );
   *     trx.commit();
   *     console.log(trx.id);
   *     // 'AS-0000000-0000-0000-0000-00000000000'
   *     return trx;
   *   } catch (error) {
   *     console.log(error);
   *     // handle error conditions
   *   }
   * }
   *
   * transactionExample();
   */
  newTransaction = async (
    isolationLevel?: ArcadeTransactionIsolationLevel
  ): Promise<SpriteTransaction> => {
    try {
      // 'READ_COMMITTED' is default in ARCADEDB,
      // so we don't bother sending that
      const response = await this._client.fetch(
        this._endpoint(endpoints.beginTransaction),
        {
          method: 'POST',
          body:
            isolationLevel === 'REPEATABLE_READ'
              ? JSON.stringify({ isolationLevel })
              : null
        }
      );

      if (response.status !== 204) {
        throw new Error(
          `Server returned an unexpected response. Status: ${response.status} / ${response.statusText}.`
        );
      }

      const sessionId = response.headers.get('arcadedb-session-id');

      // Must check if it's a string because it be null from
      // headers.get()
      if (typeof sessionId !== 'string') {
        throw new Error('Invalid transaction key received from server.');
      } else {
        return new SpriteTransaction(this, sessionId);
      }
    } catch (error) {
      throw new Error(
        `Unable to begin transaction in database "${this.name}".`,
        { cause: error }
      );
    }
  };
  /**
   * Commits a transaction on the server, provided a transaction id.
   * Provide the id obtained from the transaction returned from invoking
   * `SpriteDatabase.newTransaction()`.
   * @note You can use the `SpriteTransaction.commit()` method directly.
   * @param {string} transactionId The ID of the transaction to commit.
   * @returns {Promise<boolean>} Promise that resolves to boolean `true` if successful, and `false` otherwise.
   * @throws Error if it cannot commit the transaction.
   * @example
   * async function commitTransactionExample() {
   *   try {
   *     const trx = await database.newTransaction();
   *     await database.command(
   *       'sql',
   *       'CREATE document TYPE aType',
   *       trx
   *     );
   *     console.log(trx.id);
   *     // 'AS-0000000-0000-0000-0000-00000000000'
   *     database.commitTransaction(trx.id);
   *     return trx;
   *   } catch (error) {
   *     console.log(error);
   *     // handle error conditions
   *   }
   * }
   *
   * commitTransactionExample();
   */
  commitTransaction = async (transactionId: string): Promise<boolean> => {
    try {
      if (!transactionId) {
        throw new TypeError(
          `Must supply a transactionId in order to commit a transaction`
        );
      }
      const result = await this._client.fetch(
        this._endpoint(endpoints.commitTransaction),
        {
          method: 'POST',
          headers: {
            'arcadedb-session-id': transactionId
          }
        }
      );
      if (result.status === 204) {
        return true;
      } else {
        throw new Error(
          `Unexpected response from the server when attemping to commit transaction ${transactionId}`
        );
      }
    } catch (error) {
      throw new Error(`Unable to commit transaction ${transactionId}`, {
        cause: error
      });
    }
  };
  /**
   * Rolls back a transaction on the server. Provide the session id obtained with the `SpriteDatabase.newTransaction()` method.
   * @param {string} transactionId The ID of the transaction to commit.
   * @returns {Promise<boolean>} The response from the server.
   * @example
   * async function rollbackTransactionExample() {
   *   try {
   *     const trx = await database.newTransaction();
   *     await database.command(
   *       'sql',
   *       'CREATE document TYPE aType',
   *       trx
   *     );
   *     await trx.commit();
   *     console.log(trx.id);
   *     // 'AS-0000000-0000-0000-0000-00000000000'
   *     database.rollbackTransaction(trx.id);
   *     return trx;
   *   } catch (error) {
   *     console.log(error);
   *     // handle error conditions
   *   }
   * }
   *
   * rollbackTransactionExample();
   */
  rollbackTransaction = async (transactionId: string): Promise<boolean> => {
    try {
      if (!transactionId) {
        throw new Error(
          `Must supply a transactionId in order to rollback a transaction.`
        );
      }
      const result = await this._client.fetch(
        this._endpoint(endpoints.rollbackTransaction),
        {
          method: 'POST',
          headers: {
            'arcadedb-session-id': transactionId
          }
        }
      );
      console.log(result.status);
      if (result.status === 204) {
        return true;
      } else {
        throw new Error(
          `Unexpected response from the server when attemping to rollback transaction ${transactionId}`
        );
      }
    } catch (error) {
      throw new Error(`Unable to rollback transaction ${transactionId}`, {
        cause: error
      });
    }
  };
}

export { SpriteDatabase };
