import { SpriteEdgeVertexDescriptor } from '../../../types/edge.js';
import { buildEdgePoint } from '../../utilities/buildEdgePoint.js';

export function from(from: SpriteEdgeVertexDescriptor<any, any>) {
  try {
    return `FROM ${buildEdgePoint(from)}`;
  } catch (error) {
    throw new Error(
      `Did not receive a valid input for the 'from' variable. Could not set FROM on the command. 'from' must be `,
    );
  }
}
