import { ArcadeRecordType } from '../../../types/database.js';

export function create(recordType: ArcadeRecordType) {
  try {
    return `CREATE ${recordType}`;
  } catch (error) {
    throw new Error(
      `Could not generate CREATE [recordType] TYPE node for record type: [${recordType}].`,
      { cause: error }
    );
  }
}
