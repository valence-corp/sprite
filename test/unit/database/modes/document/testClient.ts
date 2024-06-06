import { client as dbClient } from '../../client/testClient.js';
import { DocumentTypes } from '../../types';

export { dbClient };

const client = dbClient.documents<DocumentTypes>();

export { client };
