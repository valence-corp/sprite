/** Base Interface for a command response from ArcadeDB */
interface CommandResponse<T = string> {
  operation: T;
}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a command that is a `BUCKET` operation
 */
type BucketOperationResponse<T = string, R = string> = Array<
  CommandResponse<R> & {
    bucketName: T;
    bucketId: number;
  }
>;

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `ALTER BUCKET` command
 */
export interface AlterBucket<Name = string>
  extends BucketOperationResponse<Name, 'alter bucket'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `CREATE BUCKET` command
 */
export interface CreateBucket<Name = string>
  extends BucketOperationResponse<Name, 'create bucket'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `DROP BUCKET` command
 */
export interface DropBucket<Name = string>
  extends BucketOperationResponse<Name, 'drop bucket'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a command that is a `TYPE` operation
 */
type TypeOperationResponse<T = string, R = string> = Array<
  CommandResponse<R> & {
    typeName: T;
  }
>;

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `ALTER TYPE` command
 */
export interface AlterType<Name = string>
  extends TypeOperationResponse<Name, 'alter type'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `CREATE document TYPE <Name>` command
 */
export interface CreateDocumentType<Name = string>
  extends TypeOperationResponse<Name, 'create document type'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `CREATE edge TYPE <Name>` command
 */
export interface CreateEdgeType<Name = string>
  extends TypeOperationResponse<Name, 'create edge type'> {}

/**
 * An array, which contain an object returned from
 * ArcadeDB for a `CREATE vertex TYPE <Name>` command
 */
export interface CreateVertexType<Name = string>
  extends TypeOperationResponse<Name, 'create vertex type'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `DROP document TYPE <Name>` command
 */
export interface DropDocumentType<Name = string>
  extends TypeOperationResponse<Name, 'drop document type'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `DROP edge TYPE <Name>` command
 */
export interface DropEdgeType<Name = string>
  extends TypeOperationResponse<Name, 'drop edge type'> {}

/**
 * An array, which contains an object returned from
 * ArcadeDB for a `DROP vertex TYPE <Name>` command
 */
export interface DropVertexType<Name = string>
  extends TypeOperationResponse<Name, 'drop vertex type'> {}
