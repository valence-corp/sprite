import { SpriteDatabase } from "./SpriteDatabase.js";

export class SpriteTransaction {
  private _id: string;
  private _committed: boolean = false;
  private database: SpriteDatabase;
  constructor(database: SpriteDatabase, transactionId: string) {
    if (!transactionId) {
      throw new Error(
        `A transaction ID must be supplied as a parameter in order to return an instance of SpriteTransaction. Recieved ${transactionId}`,
      );
    }
    this.database = database;
    this._id = transactionId;
  }
  /** The trasaction ID */
  get id() {
    return this._id;
  }
  /** Whether or not the transaction has been committed */
  get committed() {
    return this._committed;
  }
  commit = async () => {
    try {
      this._committed = await this.database.commitTransaction(this.id);
      return this.committed;
    } catch (error) {
      throw new Error(`Could not commit transaction: ${this.id}`, {
        cause: error,
      });
    }
  };
  rollback = async () => {
    try {
      await this.database.rollbackTransaction(this.id);
      this._committed = false;
    } catch (error) {
      throw new Error(`Could not rollback transaction: ${this.id}`, {
        cause: error,
      });
    }
  };
}
