import { validation } from '../../../validation/ArcadeParameterValidation.js';

export function createEdge<T>(typeName: T) {
  try {
    //validation.typeName(typeName);
    return `CREATE EDGE ${typeName}`;
  } catch (error) {
    throw new TypeError(`Could not set CREATE EDGE [typeName] command.`, {
      cause: error,
    });
  }
}
