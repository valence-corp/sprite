//import { ISpriteDatabaseSchema, TypeInRecordCategory } from 'src/old/SpriteDatabase.js';
//import { validation } from '../../../validation/ArcadeParameterValidation.js';

export function drop<N>(typeName: N) {
  try {
    //validation.typeName(typeName);
    return `DROP TYPE ${typeName as string}`;
  } catch (error) {
    throw new TypeError(`Could not set DROP TYPE on the command.`, {
      cause: error,
    });
  }
}
