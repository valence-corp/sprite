import { SpriteDatabase } from './SpriteDatabase.js';
import { createPropertyNodes } from './nodes/create/property/index.js';
import { TypeNames } from './types/database.js';

/**
 * Options for configuring a property.
 */
export type ArcadePropertyConstraints = {
  /**
   * If true, the property must be present. Default is false.
   * @default false
   */
  mandatory?: boolean;

  /**
   * If true, the property, if present, cannot be null. Default is false.
   * @default false
   */
  notnull?: boolean;

  /**
   * If true, the property cannot be changed after the creation of the record. Default is false.
   * @default false
   */
  readonly?: boolean;

  /**
   * Defines the minimum value for this property.
   * For number types, it is the minimum number as a value.
   * For strings, it represents the minimum number of characters.
   * For dates, it is the minimum date (uses the database date format).
   * For collections (lists, sets, maps), this attribute determines the minimally required number of elements.
   */
  min?: number | string;

  /**
   * Defines the maximum value for this property.
   * For number types, it is the maximum number as a value.
   * For strings, it represents the maximum number of characters.
   * For dates, it is the maximum date (uses the database date format).
   * For collections (lists, sets, maps), this attribute determines the maximally allowed number of elements.
   */
  max?: number | string;

  /**
   * Defines the mask to validate the input as a Regular Expression.
   */
  regexp?: string;

  /**
   * Defines default value if not present.
   * @default null
   */
  default?: any;
};

export interface ISpritePropertyOptions {
  ifNotExists: boolean;
  embeddedType: string;
  constraints?: ArcadePropertyConstraints;
}

export type ArcadePropertyDataType =
  | 'BOOLEAN'
  | 'BYTE'
  | 'SHORT'
  | 'INTEGER'
  | 'LONG'
  | 'STRING'
  | 'LINK'
  | 'BINARY'
  | 'DATE'
  | 'DATETIME'
  | 'FLOAT'
  | 'DOUBLE'
  | 'DECIMAL'
  | 'LIST'
  | 'MAP'
  | 'EMBEDDED';

export type ValidSuperTypeKey<S, N extends TypeNames<S>> = keyof Omit<S, N>;

export class SpriteType<S, N extends TypeNames<S>> {
  name: N;
  nodes = createPropertyNodes;
  database: SpriteDatabase;
  constructor(database: SpriteDatabase, typeName: N) {
    this.name = typeName;
    this.database = database;
  }
  // createProperty = (
  //   property: keyof S[N],
  //   dataType: ArcadePropertyDataType,
  //   options?: ISpritePropertyOptions,
  // ) => {
  //   const command = new SpriteCommand({
  //     initial: this.nodes.createProperty(
  //       this.name as string,
  //       property as string,
  //     ),
  //   });

  //   if (options?.ifNotExists) {
  //     command.append<boolean>(this.nodes.ifNotExists, options.ifNotExists);
  //   }

  //   if (options?.constraints) {
  //     command.append<ArcadePropertyConstraints>(
  //       this.nodes.constraints,
  //       options.constraints,
  //     );
  //   }

  //   return this.database.command('sql', command.toString());
  // };
}
