import { validation } from '../../../validation/ArcadeParameterValidation.js';

export function wait(time: number) {
  try {
    validation.integer(time);
    return `WAIT ${time}`;
  } catch (error) {
    throw new TypeError(`Could not set WAIT (time) on the command.`, {
      cause: error,
    });
  }
}
