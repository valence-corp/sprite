import { SpriteEdgeVertexDescriptor } from '../../types/edge.js';
import { selectIndex } from '../../nodes/select/selectIndex.js';

// TODO: Need object validation if we are going to go this route.

/**
 * If the supplied value is a string (rid) it just returns the string,
 * if it's an object representing an index of a record, then it converts it
 * to a `SELECT FROM` string using a template.
 * TODO: This could be expanded to include more elaborate queries
 * instead of a basic `SELECT FROM` key / value thing
 * @param {SpriteEdgeVertexDescriptor} point
 * @returns
 */
export function buildEdgePoint(
  point: SpriteEdgeVertexDescriptor<any, any>,
): string {
  return typeof point === 'string'
    ? point
    : `(${selectIndex(point.type, point.key as string, point.value)})`;
}
