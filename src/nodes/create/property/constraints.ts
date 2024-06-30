// TODO: this can probably be optimized, I know the join is slow
// it's not a priority since it's for setting up the database

import { ArcadeSchemaConstraints } from '@sprite/types/type.js';

// TODO: probably not a good idea to indiscriminately check every
// constraint to see if it's an object, when only default should
// be an object
export function constraints(constraints: ArcadeSchemaConstraints<unknown>) {
  return `(${Object.entries(constraints)
    .map((entry) => {
      return `${entry[0]} ${
        typeof entry[1] === 'object' ? JSON.stringify(entry[1]) : entry[1]
      }`;
    })
    .join(', ')})`;
}
