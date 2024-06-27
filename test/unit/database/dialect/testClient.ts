import { SqlDialect } from "../../../../src/SqlDialect.js";
import { client as dbClient } from "../client/testClient.js";

export const client = new SqlDialect(dbClient);
