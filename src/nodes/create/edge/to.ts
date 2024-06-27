import { TypeNames } from "../../../types/database.js";
import { SpriteEdgeVertexDescriptor } from "../../../types/edge.js";
import { buildEdgePoint } from "../../utilities/buildEdgePoint.js";

export function to<V, N extends TypeNames<V>>(
  to: SpriteEdgeVertexDescriptor<V, N>
) {
  try {
    return `TO ${buildEdgePoint(to)}`;
  } catch (error) {
    throw new Error(
      `Did not receive a valid input for the 'to' variable. Could not set TO on the command. 'to' must be `
    );
  }
}
