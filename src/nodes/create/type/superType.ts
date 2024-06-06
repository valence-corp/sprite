import { validation } from '../../../validation/ArcadeParameterValidation.js';

export function superType<T>(typeName: T) {
  try {
    validation.typeName(typeName);
    return `EXTENDS ${typeName}`;
  } catch (error) {
    throw new Error(`Could not build EXTENDS sql node for type: ${typeName}`, {
      cause: error,
    });
  }
}
