import { client as dbClient } from "../../client/testClient.js";
import { EdgeTypes, VertexTypes } from "../../types.js";

export { dbClient };
const client = dbClient.graph<VertexTypes, EdgeTypes>();

export { client };
