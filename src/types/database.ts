import { ArcadeSelectTimeoutStrategy } from '../nodes/types.js';
import { ISpriteRestClientConnectionParameters } from './client.js';
import { SpriteRestClient } from '../SpriteRestClient.js';
import { SpriteTransaction } from '../SpriteTransaction.js';
import { ValidSuperTypeKey } from '../SpriteType.js';

export type ArcadeRecordCategory = 'd' | 'e' | 'v';
export type ArcadeRecordType = 'document' | 'edge' | 'vertex';

export type RecordBase = {
  '@rid': string;
  '@cat': ArcadeRecordCategory;
  '@type': string;
};

export type EdgeBase = RecordBase & {
  '@in': string;
  '@out': string;
};

export type WithArcadeEdgeRecordMeta<S> = {
  [K in keyof S]: S[K] & EdgeBase;
};

export type WithArcadeRecordMeta<S> = {
  [K in keyof S]: S[K] & RecordBase;
};

export type TypeNames<Schema> = keyof Schema;

/**
 * The parameters necessary to perform opertations
 * on a target ArcadeDB database.
 */
export interface ISpriteDatabaseConnectionParameters
  extends ISpriteRestClientConnectionParameters {
  /**
   * The name of the database to connect to.
   */
  databaseName: string;
}

export interface ISpriteDatabaseClientParameters {
  client: SpriteRestClient;
  databaseName: string;
}

/**
 * The Query languages supported by ArcadeDB, to be declared when
 * using SpriteDatabase.query() and SpriteDatabase.command() methods
 */
export type ArcadeSupportedQueryLanguages =
  | 'sql'
  | 'sqlscript'
  | 'graphql'
  | 'cypher'
  | 'gremlin'
  | 'mongo';

/**
 * Options to create a new type with.
 */
export interface ISpriteCreateTypeOptions<S, N extends TypeNames<S>> {
  /**
   * When set to true, the type creation will be ignored if the
   * type already exists (instead of failing with an error).
   * @default false
   */
  ifNotExists?: boolean;
  /**
   * Defines a super-type you want to extend with this type.
   */
  extends?: ValidSuperTypeKey<S, N>;
  /**
   * A bucket-name, or an array of bucket-names you want this type to use.
   */
  buckets?: string | Array<string>;
  /**
   * Defines the total number of buckets you want to create for this type. The
   * @default 1
   */
  totalBuckets?: number;
}

export type OmitMeta<T> = Omit<T, keyof RecordBase | keyof EdgeBase>;

/** Options to insert a new record with */
export interface ISpriteInsertRecordOptions<T> {
  /** The data to populate the newly created reacord with */
  data?: OmitMeta<T>;
  /** The bucket to store the record in */
  bucket?: string;
}

/**
 * Options for a database.dropType() command
 */
export interface ISpriteDropTypeOptions {
  /**
   * Prevent errors if the type does not exits when attempting to drop it.
   * @default false;
   */
  ifExists?: boolean;
  /**
   * Defines whether the command drops non-empty edge and vertex types. Note, this can
   * disrupt data consistency. Be sure to create a backup before running it.
   * @default: false
   */
  unsafe?: boolean;
}

/** A function which contains the operations to be conducted within a transaction */
export type SpriteTransactionCallback =
  | ((trx: SpriteTransaction) => Promise<void>)
  | ((trx: SpriteTransaction) => void);

/**
 * How the bucket will be selected for a newly created record of this type
 * @default 'round-robin'
 */
export type ArcadeBucketSelectionStrategies =
  | 'round-robin'
  | 'thread'
  | 'partitioned<primary-key>';

/**
 * A type definition returned by ArcadeDB when a getSchema command
 * is compeleted.
 */
export type ArcadeTypeDefinition = {
  /** The name of the type */
  name: string;
  /** The category of the type (document, vertex, or edge) */
  type: ArcadeRecordType;
  /**
   * The number of records with this type name
   */
  records: number;
  /**
   * The buckets associated with this type.
   */
  buckets: Array<string>;
  /** How the bucket will be selected for a newly created record of this type */
  bucketSelectionStrategy: ArcadeBucketSelectionStrategies;
  /**
   * Super types associated with this type.
   */
  parentTypes: Array<string>;
  /**
   * Properties defined for this type.
   */
  properties: Array<string>;
  /** Indexes defined for records of this type */
  indexes: Array<string>;
  /** An object for custom user-defined properties for this type */
  custom: Record<string, unknown>;
};

export type ArcadeGetSchemaResponse = Array<ArcadeTypeDefinition>;

export type ArcadeSqlExplanationExecutionPlan = {
  type: 'QueryExecutionPlan' | 'DDLExecutionPlan';
  javaType: string;
  cost: number;
  prettyPrint: string;
  steps: object[];
};

/**
 * An object representing the explanation of an
 * SQL command.
 */
export type ArcadeSqlExplanation = {
  executionPlan: ArcadeSqlExplanationExecutionPlan;
  executionPlanAsString: string;
};

/**
 * An object returned from the server following a successfully command / query
 *
 */
export interface ArcadeCommandResponse<T = unknown> {
  /**
   * The user that issued the command / query.
   */
  user: string;
  /** The version of ArcadeDB returning the result. */
  version: string;
  /**
   * The name of the server returning the result.
   */
  serverName: string;
  /**
   * The result of the command / query.
   */
  result: T;
}

export type ArcadeQueryResponse<T = unknown> = ArcadeCommandResponse<T>;

// TODO: I have not checked these for compatibility with ArcadeDB
export declare const COMPARISON_OPERATORS: readonly [
  '=',
  '==',
  '!=',
  '<>',
  '>',
  '>=',
  '<',
  '<=',
  'in',
  'not in',
  'is',
  'is not',
  'like',
  'not like',
  'match',
  'ilike',
  'not ilike',
  '@>',
  '<@',
  '&&',
  '?',
  '?&',
  '!<',
  '!>',
  '<=>',
  '!~',
  '~',
  '~*',
  '!~*',
  '@@',
  '@@@',
  '!!',
  '<->',
  'regexp',
  'is distinct from',
  'is not distinct from',
];

export type SpriteOperators = (typeof COMPARISON_OPERATORS)[number];

export interface ISpriteSelectFromOptions<
  S,
  N extends keyof S,
  P extends keyof WithRid<S, N>,
> {
  /**
   * Designates conditions to filter the result-set.
   */
  where?: SpriteWhereClause<S, N, P>;
  /**
   * Designates the field with which to order the result-set.
   * Use the optional 'ASC' and 'DESC' operators to define the direction of the order.
   */
  orderBy?: {
    field: keyof S[N];
    /**
     * Defines the direction to sort the result (ASCending or DESCending).
     * @default 'ASC'.
     */
    direction?: 'ASC' | 'DESC';
  };
  /**
   * Defines the number of records you want to skip from the start of the result-set.
   * You mayfind this useful in Pagination, when using it in conjunction with the
   * limit `option`.
   */
  skip?: number;
  /**
   * Defines the maximum number of records in the result-set. You may find this useful in
   * Pagination, when using it in conjunction with the `skip` option.
   */
  limit?: number;
  /**
   * Defines the maximum time in milliseconds for the query, and optionally the
   * exception strategy to use.
   */
  timeout?: {
    /**
     *  The duration of the timeout in milliseconds.
     */
    duration: number;
    /**
     * The timeout strategy to use.\
     * `RETURN` Truncates the result-set, returning the data collected up to the timeout.\
     * `EXCEPTION` Raises an exception.
     */
    strategy?: ArcadeSelectTimeoutStrategy;
  };
}

export type WithRid<S, N extends TypeNames<S>> = OmitMeta<S[N]> & {
  '@rid': string;
};

export type SpriteWhereClause<
  S,
  N extends TypeNames<S>,
  P extends keyof WithRid<S, N>,
> = [P, SpriteOperators, WithRid<S, N>[P]];

export interface ISpriteDeleteFromOptions<
  S,
  N extends TypeNames<S>,
  P extends keyof WithRid<S, N>,
> {
  /**
   * Designates conditions to filter the result-set.
   */
  where: SpriteWhereClause<S, N, P>;
  /**
   * The duration of the timeout in milliseconds.
   */
  timeout?: number;
  /**
   * Defines the maximum number of records in the result-set.
   * @default undefined
   */
  limit?: number;
  /**
   * Defines what is returned following the command: the count of the records before (`BEFORE`) or following deletion (`COUNT`).
   * @default 'COUNT'
   */
  return?: 'COUNT' | 'BEFORE';
}
