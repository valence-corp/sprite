import { ArcadePropertyConstraints } from "../../../SpriteType.js";

export function constraints(constraints: ArcadePropertyConstraints) {
  return `(${Object.entries(constraints)
    .map((entry) => {
      return `${entry[0]} ${entry[1]}`;
    })
    .join(", ")})`;
}
