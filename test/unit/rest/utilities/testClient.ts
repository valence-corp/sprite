import { SpriteRestClient } from "../../../../src/SpriteRestClient";
import { variables } from "../../../variables";

export const client = new SpriteRestClient({
  address: variables.address,
  username: variables.username,
  password: variables.password,
});