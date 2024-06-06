import { TypeNames } from './database';

export type DeleteFromCount = { count: number };
export type ArcadeDeleteFromResponse = Array<DeleteFromCount>;

export type RecordOperationResponse = {
  operation: string;
  typeName: string;
};

export type ArcadeCreateTypeResponse = Array<RecordOperationResponse>;
export type ArcadeCreateEdgeResponse<E, N extends TypeNames<E>> = Array<E[N]>;
export type ArcadeUpdateOneResponse = Array<RecordOperationResponse>;
