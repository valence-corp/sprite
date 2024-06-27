import { ArcadeRecordType } from "../../../types/database.js";
import { validation } from "../../../validation/ArcadeParameterValidation.js";

export function create(recordType: ArcadeRecordType) {
  try {
    validation.recordType(recordType);
    return `CREATE ${recordType}`;
  } catch (error) {
    throw new Error(
      `Could not generate CREATE [recordType] TYPE node for record type: [${recordType}].`,
      { cause: error },
    );
  }
}
