import { SpriteTransaction } from '../SpriteTransaction.js';

class ArcadeParameterValidation {
  private simpleRegex =
    /^(?!@rid$|@type$|@cat$|@in$|@out$)[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  constructor() {}
  transaction = (transaction?: SpriteTransaction) => {
    if (!transaction) {
      throw new Error('This operation must be performed within a transaction.');
    }
    if (transaction.committed) {
      throw new Error(
        'The transaction supplied to this operation has already been commited, try again with an open transaction.',
      );
    }
  };
  /**
   * Test an object for existence and non-emptiness.
   * @param value The object to be tested for existence and non-emptiness
   * @returns {boolean} `true` or `false` depending on the presence of a non-empty object
   */
  nonEmptyObject = (variable: any): boolean => {
    if (
      typeof variable === 'object' &&
      variable !== null &&
      !Array.isArray(variable) &&
      Object.keys(variable).length > 0
    ) {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as a non-empty object. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  isArray = (variable: any): boolean => {
    if (Array.isArray(variable)) {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as an array. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  /**
   * Test a string for existence and non-emptiness.
   * @param value The string to be tested for existence and non-emptiness
   * @returns {boolean} `true` or `false` depending on the presence of a non-empty string
   */
  nonEmptyString = (variable: any): boolean => {
    if (typeof variable === 'string' && variable.trim() !== '') {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as a string. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  bucketName = (variable: unknown) => {
    if (typeof variable === 'string') {
      if (this.simpleRegex.test(variable as string)) {
        return true;
      } else {
        throw new TypeError(
          `The supplied argument could not be validated as a properly formatted database name for ArcadeDB. ${this.getVariableDescription(
            variable,
          )}`,
        );
      }
    }

    if (Array.isArray(variable)) {
      // TODO: this is a basic validation check to see if the parameter is an array of strings
      // it's really not great validation.
      return true;
    }

    throw new TypeError(
      `The supplied argument could not be validated as a properly formatted database name for ArcadeDB. ${this.getVariableDescription(
        variable,
      )}`,
    );
  };
  /**
   * Test a string to validate it as a database name in ArcadeDB.
   * @param value The string to be tested for existence and non-emptiness
   * @returns {boolean} `true` or `false` depending on the presence of a non-empty string
   */
  databaseName = (variable: unknown) => {
    if (this.simpleRegex.test(variable as string)) {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as a properly formatted database name for ArcadeDB. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  simpleIdentifier = (variable: unknown) => {
    if (this.simpleRegex.test(variable as string)) {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as an identifier for ArcadeDB Sprite currently only allows simple identifiers as described in the documentation: https://docs.arcadedb.com/#SQL-Syntax. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  /**
   * Test a string to validate it as a type name in ArcadeDB.
   * @param value The string to be tested for existence and non-emptiness
   * @returns {boolean} `true` or `false` depending on the presence of a non-empty string
   */
  typeName = (variable: unknown) => {
    if (this.simpleRegex.test(variable as string)) {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as a properly formatted type name for ArcadeDB. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  /**
   * Test a string to validate it as a record type in ArcadeDB.
   * @param value The string to be tested
   * @returns {boolean} `true` or `false` depending on the presence of a non-empty string
   */
  recordType = (variable: any) => {
    if (
      variable === 'document' ||
      variable === 'edge' ||
      variable === 'vertex'
    ) {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as a record type of ArcadeDB ('document', 'edge', or 'vertex'). ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  /**
   * Validate a URL (string).
   * @param value The URL to be validated.
   * @returns {boolean} `true` or `false` depending on the validity of the URL
   */
  url = (variable: unknown): boolean => {
    try {
      new URL(variable as string);
      return true;
    } catch (error) {
      throw new TypeError(
        `The supplied argument could not be validated as properly formatted URL. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  integer = (variable: unknown): boolean => {
    if (typeof variable === 'number') {
      return true;
    } else {
      throw new TypeError(
        `The supplied argument could not be validated as an. ${this.getVariableDescription(
          variable,
        )}`,
      );
    }
  };
  private getVariableDescription = (variable: any) => {
    return `The supplied argument was: [${JSON.stringify(
      variable,
    )}], which is of type: [${typeof variable}].`;
  };
}

export { ArcadeParameterValidation };

export const validation = new ArcadeParameterValidation();