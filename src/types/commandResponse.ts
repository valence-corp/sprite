interface CommandResponse<T = string> {
  operation: string;
}

export interface BucketOperationResponse<T = string> extends CommandResponse {
  bucketName: T;
  bucketId: number;
}

interface TypeOperationResponse<T = string, > extends CommandResponse {
  typeName: T;
}

export interface CreateTypeResponse<T> extends TypeOperationResponse<T> {}

