import { SpriteOperations } from '../../../../src/SpriteOperations.js';
import { client as dbClient } from '../client/testClient.js';

export const client = new SpriteOperations(dbClient);
