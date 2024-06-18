import { SpriteCommand } from "./SpriteCommand.js";
import { SpriteDatabase } from "./SpriteDatabase.js";
import { SpriteTransaction } from "./SpriteTransaction.js";
import { createPropertyNodes } from "./nodes/create/property/index.js";
import { TypeNames } from "./types/database.js";
import {
  ArcadeSchemaConstraints,
  ArcadeSchemaDataType,
  SpriteSchemaDefinition,
} from "./types/type.js";

/**
 * @description Used to define properties of a type in the schema.
 * @experimental
 */
export class SpriteType<S, N extends TypeNames<S>> {
  private _database: SpriteDatabase;
  private _name: N;
  private _nodes = createPropertyNodes;
  /** The name of the type */
  get name() {
    return this._name;
  }
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
          constraints: constraints as any,
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
