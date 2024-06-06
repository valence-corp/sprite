import { ArcadePropertyConstraints } from '../../../SpriteType';

export function constraints(constraints: ArcadePropertyConstraints) {
  return `(${Object.entries(constraints)
    .map((entry) => {
      return `${entry[0]} ${entry[1]}`;
    })
    .join(', ')})`;
}
