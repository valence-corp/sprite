import { TypeNames } from "../../../types/database.js";
import { SpriteEdgeVertexDescriptor } from "../../../types/edge.js";
import { buildEdgePoint } from "../../utilities/buildEdgePoint.js";

export function from<V, N extends TypeNames<V>>(
  from: SpriteEdgeVertexDescriptor<V, N>
) {
  try {
    return `FROM ${buildEdgePoint(from)}`;
  } catch (error) {
    throw new Error(
      `Did not receive a valid input for the 'from' variable. Could not set FROM on the command. 'from' must be `
    );
  }
}
