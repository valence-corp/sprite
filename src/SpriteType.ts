import { SpriteDatabase } from "./SpriteDatabase.js";
import { createPropertyNodes } from "./nodes/create/property/index.js";
import { TypeNames } from "./types/database.js";

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
}
