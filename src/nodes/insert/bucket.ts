import { validation } from "../../validation/ArcadeParameterValidation.js";

export function bucket(bucketName: string) {
  try {
    validation.bucketName(bucketName);
    return `BUCKET:${bucketName}`;
  } catch (error) {
    throw new TypeError(
      `Could not set BUCKET:[bucketName(s)] on the command.`,
      { cause: error },
    );
  }
}
