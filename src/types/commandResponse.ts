/** Base Interface for a command response from ArcadeDB */
interface CommandResponse<T = string> {
  operation: T;
}

/** Object returned from ArcadeDB for a command that is a `BUCKET` operation */
interface BucketOperationResponse<T = string, R = string>
  extends CommandResponse<R> {
  bucketName: T;
  bucketId: number;
}

/** Object returned from ArcadeDB for a `ALTER BUCKET` command */
export interface AlterBucket<Name = string>
  extends BucketOperationResponse<Name, 'alter bucket'> {}

/** Object returned from ArcadeDB for a `CREATE BUCKET` command */
export interface CreateBucket<Name = string>
  extends BucketOperationResponse<Name, 'create bucket'> {}

/** Object returned from ArcadeDB for a `DROP BUCKET` command */
export interface DropBucket<Name = string>
  extends BucketOperationResponse<Name, 'drop bucket'> {}

/** Object returned from ArcadeDB for a command that is a `TYPE` operation */
interface TypeOperationResponse<T = string, R = string>
  extends CommandResponse<R> {
  typeName: T;
}

/** Object returned from ArcadeDB for a `ALTER TYPE` command */
export interface AlterType<Name = string>
  extends TypeOperationResponse<Name, 'alter type'> {}

/** Object returned from ArcadeDB for a `CREATE document TYPE <Name>` command */
export interface CreateDocumentType<Name = string>
  extends TypeOperationResponse<Name, 'create document type'> {}

/** Object returned from ArcadeDB for a `CREATE edge TYPE <Name>` command */
export interface CreateEdgeType<Name = string>
  extends TypeOperationResponse<Name, 'create edge type'> {}

/** Object returned from ArcadeDB for a `CREATE vertex TYPE <Name>` command */
export interface CreateVertexType<Name = string>
  extends TypeOperationResponse<Name, 'create vertex type'> {}

/** Object returned from ArcadeDB for a `DROP document TYPE <Name>` command */
export interface DropDocumentType<Name = string>
  extends TypeOperationResponse<Name, 'drop document type'> {}

/** Object returned from ArcadeDB for a `DROP edge TYPE <Name>` command */
export interface DropEdgeType<Name = string>
  extends TypeOperationResponse<Name, 'drop edge type'> {}

/** Object returned from ArcadeDB for a `DROP vertex TYPE <Name>` command */
export interface DropVertexType<Name = string>
  extends TypeOperationResponse<Name, 'drop vertex type'> {}