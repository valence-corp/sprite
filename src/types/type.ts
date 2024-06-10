import { OmitMeta, TypeNames } from "./database.js";

export type ValidSuperTypeKey<S, N extends TypeNames<S>> = keyof Omit<S, N>;

export type ArcadeEmbeddedMap<T> = Record<string, T>;

export type SpriteSchemaDefinitionMinMax = {
  /**
   * Defines the minimum value for this property. For number types it is the
   * minimum number as a value. For strings it represents the minimum number of characters.
   * For dates is the minimum date (uses the database date format). For collections (lists, sets,
   * maps) this attribute determines the minimally required number of elements.
   * @default undefined
   */
  min?: number;
  /**
   * Defines the maximum value for this property. For number types it is the
   * maximum number as a value. For strings it represents the maximum number of characters.
   * For dates is the maximum date (uses the database date format). For collections (lists, sets,
   * maps) this attribute determines the maximum required number of elements.
   * @default undefined
   */
  max?: number;
};

export type SpriteSchemaStringDefinition = {
  type: "string";
} & SpriteSchemaDefinitionMinMax;

export type SpriteSchemaNumberDefinition = {
  type: "short" | "integer" | "long" | "float" | "double" | "decimal";
} & SpriteSchemaDefinitionMinMax;

export type SpriteSchemaMapDefinition = {
  type: "map";
};

export type SpriteSchemaBooleanDefinition = {
  type: "boolean";
};
export type SpriteSchemaDateDefinition = {
  type: "date" | "datetime";
} & SpriteSchemaDefinitionMinMax;

export type SpriteSchemaBinaryDefinition = { type: "binary" };

export type ArcadeSchemaDefaultValue<T> = T extends Map<any, any>
  ? { [key: string]: string }
  : T;

export type SpriteSchemaTypeDefinition<T> = T extends string
  ? SpriteSchemaStringDefinition
  : T extends ArcadeEmbeddedMap<any>
  ? SpriteSchemaMapDefinition
  : T extends boolean
  ? SpriteSchemaBooleanDefinition
  : T extends number
  ? SpriteSchemaNumberDefinition
  : T extends Buffer
  ? SpriteSchemaBinaryDefinition
  : T extends Date
  ? SpriteSchemaDateDefinition
  : never;

export type ArcadeSchemaConstraints<T> = {
  /**
   * If true, the property must be present.
   * @default false
   */
  mandatory?: boolean;
  /**
   * If true, the property, if present, cannot be null.
   * @default false
   */
  notnull?: boolean;
  /**
   * If true, the property cannot be changed after the creation of the record
   * @default false
   */
  readonly?: boolean;
  /**
   * Defines default value if not present.
   * @default null
   * @example { default: 0 }
   */
  default?: T;
  /**
   * Defines the mask to validate the input as a Regular Expression
   * @default undefined
   */
  regexp?: string;
};

export type SpriteSchemaProperty<
  S,
  N extends TypeNames<S>,
  P extends keyof S[N]
> = SpriteSchemaTypeDefinition<S[N][P]> & ArcadeSchemaConstraints<S[N][P]>;

export type SpriteSchemaDefinition<S, N extends TypeNames<S>> = {
  [key in keyof OmitMeta<S[N]>]: SpriteSchemaProperty<S, N, key>;
};

export type ArcadeSchemaDataType<T> = T extends string
  ? "string"
  : T extends number
  ? "integer" | "float" | "short" | "long"
  : T extends ArcadeEmbeddedMap<any>
  ? "map"
  : never;

// type JSONSchemaTypes = "string" | "number" | "integer" | "boolean" | "object";

// export type JSONSchemaProperty<
//   S,
//   N extends keyof S,
//   P extends keyof S[N]
// > = Record<string, any> &
//   JSONSchemaTypeDefinition<S, N, P> & {
//     /**
//      * [Annotations (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/annotations)\
//      * The `description` will provide a more lengthy explanation about the purpose of the data described
//      * by the schema.
//      * @default undefined
//      * @example { description: "This is the name of the user to create." }
//      */
//     description?: string;
//     /**
//      * [Annotations (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/annotations)\
//      * The `default` keyword specifies a default value. This value is not used to fill in missing values during
//      * the validation process. Non-validation tools such as documentation generators or form generators may
//      * use this value to give hints to users about how to use a value. However, `default` is typically used to
//      * express that if a value is missing, then the value is semantically the same as if the value was present
//      * with the default value. The value of `default` should validate against the schema in which it resides,
//      * but that isn't required.
//      * @default undefined
//      * @example { default: "default" }
//      * @example { default: 0 }
//      */
//     default?: S[N][P];
//     /**
//      * [Annotations (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/annotations)\
//      * The `title` will provide a short description of the data described by the schema. Longer desccriptions
//      * should be placed in the `description` keyword.
//      * @default undefined
//      * @example { title: "Username" }
//      */
//     title?: string;
//     /**
//      * [Regular Expressions (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/regular_expressions)\
//      * The `pattern` and `patternProperties` keywords use regular expressions to express constraints.
//      * The regular expression syntax used is from JavaScript
//      * ([ECMA 262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/),
//      * specifically). However, that complete syntax is not widely supported, therefore it is
//      * recommended that you stick to the subset of that syntax described in the
//      * [json-schema documentation](https://json-schema.org/understanding-json-schema/reference/regular_expressions).
//      */
//     pattern?: string;
//     /**
//      * [Read Only (json-schema.org)](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-00#rfc.section.9.4)\
//      */
//     readOnly?: boolean;
//   };

// export interface JSONSchema extends JSONSchemaBase {
//   /**
//    * [$schema (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/schema#schema)\
//    * The `$schema` keyword is used to declare which dialect of JSON Schema the schema was written for.
//    * The value of the `$schema` keyword is also the identifier for a schema that can be used to verify
//    * that the schema is valid according to the dialect `$schema` identifies.
//    * @note It is unlikely that you will need to use this keyword. Sprite was written to use a subset
//    * of the latest JSON Schema specification. This keyword is included for completeness and for future
//    * compatibility.
//    * @default undefined
//    * @example { $schema: "https://json-schema.org/draft/2020-12/schema" }
//    */
//   $schema?: string;
//   /**
//    * [Title (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/generic#title)\
//    * It is best practice to include an `$id` property as a unique identifier for each schema.
//    * @note This keyword is currently not used, but will likely be used in the future for validation.
//    * @default undefined
//    * @example { $id: "http://yourdomain.com/schemas/myschema.json" }
//    */
//   $id?: string;
// }

// interface JSONSchemaBase {
//   /**
//    * [Type-specific Keywords (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/type)\
//    * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.\
//    * At its core, JSON Schema defines the following basic types:
//    * - `string`
//    * - `number`
//    * - `integer`
//    * - `object`
//    * - `array`
//    * - `boolean`
//    * - `null`
//    * @example { type: "string" }
//    */
//   type: JSONSchemaTypes;
// }

// /**
//  * Options for configuring a property.
//  */
// export type ArcadePropertyConstraints = {
//   /**
//    * If true, the property must be present. Default is false.
//    * @default false
//    */
//   mandatory?: boolean;

//   /**
//    * If true, the property, if present, cannot be null. Default is false.
//    * @default false
//    */
//   notnull?: boolean;

//   /**
//    * If true, the property cannot be changed after the creation of the record. Default is false.
//    * @default false
//    */
//   readonly?: boolean;

//   /**
//    * Defines the minimum value for this property.
//    * For number types, it is the minimum number as a value.
//    * For strings, it represents the minimum number of characters.
//    * For dates, it is the minimum date (uses the database date format).
//    * For collections (lists, sets, maps), this attribute determines the minimally required number of elements.
//    */
//   min?: number | string;

//   /**
//    * Defines the maximum value for this property.
//    * For number types, it is the maximum number as a value.
//    * For strings, it represents the maximum number of characters.
//    * For dates, it is the maximum date (uses the database date format).
//    * For collections (lists, sets, maps), this attribute determines the maximally allowed number of elements.
//    */
//   max?: number | string;

//   /**
//    * Defines the mask to validate the input as a Regular Expression.
//    */
//   regexp?: string;

//   /**
//    * Defines default value if not present.
//    * @default null
//    */
//   default?: any;
// };

// export interface ISpritePropertyOptions<D, P> {
//   ifNotExists?: boolean;
//   embeddedType?: ArcadeEmbeddedDataTypes<D, P>;
//   constraints?: ArcadePropertyConstraints;
// }

// // export type ArcadePropertyDataType<T> =
// //   | ArcadeEmbeddedDataTypes<T>
// //   | "LIST"
// //   | "MAP"
// //   | "EMBEDDED";

// export type TypeConversion<U> = U extends number
//   ? "NUMBER"
//   : U extends string
//   ? "STRING"
//   : U extends boolean
//   ? "BOOLEAN"
//   : never;

// export type ArrayTypes<T> = T extends (infer U)[] ? TypeConversion<U> : never;

// export type MapTypes<P> = P extends Map<unknown, infer K>
//   ? TypeConversion<K>
//   : never;

// export type ArcadeEmbeddedDataTypes<D, P> = D extends "LIST"
//   ? ArrayTypes<P>
//   : D extends "MAP"
//   ? MapTypes<P>
//   : D extends "EMBEDDED"
//   ? never
//   : never;

// export type ArcadePropertyDataType<T> = T extends Array<any>
//   ? "LIST"
//   : T extends Map<any, any>
//   ? "MAP"
//   : T extends object
//   ? "EMBEDDED"
//   : T extends string
//   ? "STRING" | "DATE" | "DATETIME" | "BINARY" | "BYTE" | "LINK"
//   : T extends number
//   ? "INTEGER" | "LONG" | "SHORT" | "FLOAT" | "DOUBLE" | "DECIMAL"
//   : T extends boolean
//   ? boolean
//   : never;

// type JSONSchemaString = {
//   /**
//    * [Type-specific Keywords (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/type)\
//    * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.\
//    * Since the typescript definition for this type is a `string`, you may only select `string` here.
//    * @example { type: "string" }
//    */
//   type: "string";
//   /**
//    * [String length (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/string#length)\
//    * The length of a string can be constrained using the `minLength` property. The value must be a non-negative number.
//    * @default undefined
//    * @example { minLength: 1 }
//    */
//   minLength?: number;
//   /**
//    * [String length (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/string#length)\
//    * The length of a string can be constrained using the `maxLength` property. The value must be a non-negative number.
//    * @default undefined
//    * @example { maxLength: 10 }
//    */
//   maxLength?: number;
// };

// type JSONSchemaNumber = {
//   /**
//    * [Type-specific Keywords (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/type)\
//    * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.\
//    * Since the typescript definition for this type is a `number`, you may select `number` or `integer` here.
//    * @example { type: "number" }
//    */
//   type: "number" | "integer";
//   /**
//    * [Numeric values (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/numeric)\
//    * The `minimum` keyword is used to specify the minimum value of a number.\
//    * @default undefined
//    * @example { minimum: 1 }
//    */
//   minimum?: number;
//   /**
//    * [Numeric values (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/numeric)\
//    * The `maximum` keyword is used to specify the maximum value of a number.
//    * @default undefined
//    * @example { maximum: 100 }
//    */
//   maximum?: number;
//   /**
//    * [Numeric values (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/numeric)\
//    * The `exclusiveMinimum` keyword is used to specify that a value must be greater than a given value.
//    * In other words, it defines an exclusive lower limit for numeric values. Using mathematical notation,
//    * this keyword asserts that a value must be strictly "greater than" the value of the keyword,
//    * and not "greater than or equal" to it.
//    * @default undefined
//    * @example { exclusiveMinimum: 1 }
//    */
//   exclusiveMinimum?: number;
//   /**
//    * [Numeric values (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/numeric)\
//    * The `exclusiveMaximum` keyword is used to specify that a value must be less than a given value.
//    * In other words, it defines an exclusive upper limit for numeric values. Using mathematical notation,
//    * this keyword asserts that a value must be strictly "less than" the value of the keyword,
//    * and not "less than or equal" to it.
//    * @default undefined
//    * @example { exclusiveMaximum: 100 }
//    */
//   exclusiveMaximum?: number;
//   /**
//    * [Numeric values (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/numeric)\
//    * The `multipleOf` keyword is used to specify that a value must be a multiple of a given number.
//    * @default undefined
//    * @example { multipleOf: 2 }
//    */
//   multipleOf?: number;
// };

// type JSONSchemaBoolean = {
//   /**
//    * [Type-specific Keywords (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/type)\
//    * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.\
//    * Since the typescript definition for this type is `boolean`, you may only select `boolean` here.
//    * @example { type: "boolean" }
//    */
//   type: "boolean";
// };

// type JSONSchemaObject = {
//   /**
//    * [Type-specific Keywords (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/type)\
//    * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.\
//    * Since the typescript definition for this type is an `object`, you may only select `object` here.
//    * @example { type: "object" }
//    */
//   type: "object";
//   /**
//    * An array of property keys from the object that are required.
//    */
//   required?: Array<string>;
// };

// type JSONSchemaMap = {
//   /**
//    * [Type-specific Keywords (json-schema.org)](https://json-schema.org/understanding-json-schema/reference/type)\
//    * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.\
//    * Since the typescript definition for this type is an `object`, you may only select `object` here.
//    * @example { type: "object" }
//    */
//   type: "array";
// };

// export type JSONSchemaTypeDefinition<
//   S,
//   T extends keyof S,
//   P extends keyof S[T]
// > = S[T][P] extends string
//   ? JSONSchemaString
//   : S[T][P] extends number
//   ? JSONSchemaNumber
//   : S[T][P] extends boolean
//   ? JSONSchemaBoolean
//   : S[T][P] extends Map<any, any>
//   ? JSONSchemaMap
//   : S[T][P] extends object
//   ? JSONSchemaObject
//   : never;

// export type SpriteJSONSchema<S, N extends TypeNames<S>> = {
//   properties: {
//     [key in keyof OmitMeta<S[N]>]: JSONSchemaProperty<S, N, key>;
//   };
// };

// export const arcadeTypeDefinitionMap: any = {
//   constraints: {
//     minLength: "min",
//     maxLength: "max",
//     minimum: "min",
//     maximum: "max",
//     pattern: "regexp",
//     default: "default",
//     readOnly: "readonly",
//   },
//   types: {
//     boolean: "BOOLEAN",
//     integer: "INTEGER",
//     number: "DOUBLE",
//     string: "STRING",
//     array: "LIST",
//   },
// };
