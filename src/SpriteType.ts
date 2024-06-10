import { SpriteCommand } from "./SpriteCommand.js";
import { SpriteDatabase } from "./SpriteDatabase.js";
import { SpriteTransaction } from "./SpriteTransaction.js";
import { createPropertyNodes } from "./nodes/create/property/index.js";
import { OmitMeta, TypeNames } from "./types/database.js";

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


/**
 * @description Used to define properties of a type in the schema.
 * @experimental
 */
export class SpriteType<S, N extends TypeNames<S>> {
  private _database: SpriteDatabase;
  private _name: N;
  private _nodes = createPropertyNodes;
  constructor(database: SpriteDatabase, typeName: N) {
    this._name = typeName;
    this._database = database;
  }
  model = async (
    definitions: SpriteSchemaDefinition<S, N>,
    transaction: SpriteTransaction
  ) => {
    const properties = Object.keys(definitions) as [keyof typeof definitions];
    const reciept = [];
    for (let i = 0; i < properties.length; ++i) {
      const { type, ...constraints } = definitions[properties[i]];
      reciept.push(
        await this.createProperty(properties[i], type as any, transaction, {
          constraints,
        })
      );
    }
    return Promise.all(reciept);
  };
  createProperty = async <P extends keyof S[N]>(
    property: P,
    dataType: ArcadeSchemaDataType<S[N][P]>,
    transaction: SpriteTransaction,
    options?: {
      embeddedType?: S[N][P];
      constraints?: ArcadeSchemaConstraints<S[N][P]>;
      ifNotExists?: boolean;
    }
  ) => {
    const command = new SpriteCommand({
      initial: this._nodes.createProperty(
        this._name as string,
        property as string
      ),
    });

    if (options?.ifNotExists) {
      command.append<boolean>(this._nodes.ifNotExists, options.ifNotExists);
    }

    // TODO: command.append, perhaps it just appends the string
    // if that's all that's passed to it
    command.append((dataType) => dataType as string, dataType);

    if (options?.embeddedType) {
      command.append<S[N][P]>(
        (type: S[N][P]) => `OF ${type}`,
        options.embeddedType
      );
    }
    if (options?.constraints) {
      command.append<ArcadeSchemaConstraints<S[N][P]>>(
        this._nodes.constraints,
        options.constraints
      );
    }

    const response = await this._database.command<[{}]>(
      "sql",
      command.toString(),
      transaction
    );
    return response.result[0];
  };
}
