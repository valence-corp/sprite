import { client as dbClient } from '../../client/testClient';
import { EdgeTypes, VertexTypes } from '../../types';

export { dbClient };
const client = dbClient.graph<VertexTypes, EdgeTypes>();

export { client };
