import { AsArcadeRecords } from '../../../src/types/database.js';
import { SpriteDatabase } from '../../../src/SpriteDatabase.js';
import { variables } from '../variables.js';

export type DocumentTypes = {
  ORIDs: {
    aProperty: string;
  };
};

export type DocumentTypesWithMeta = AsArcadeRecords<DocumentTypes>;

export const testClient = new SpriteDatabase({
  username: variables.username,
  password: variables.password,
  address: variables.address,
  databaseName: variables.databaseName
});
