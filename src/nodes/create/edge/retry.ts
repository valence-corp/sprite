import { validation } from "../../../validation/ArcadeParameterValidation.js";

export function retry(attempts: number) {
  try {
    validation.integer(attempts);
    return `RETRY ${attempts}`;
  } catch (error) {
    throw new TypeError(
      `Unable to set RETRY [attempts] on the CREATE EDGE command. `,
      {
        cause: error,
      },
    );
  }
}
