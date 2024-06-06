import { where } from '../common/where';
import { returnCount } from './returnCount';
import { deleteFrom } from './delete';
import { limit } from './limit';
import { timeout } from './timeout';

export const deleteFromNodes = {
  delete: deleteFrom,
  where,
  returnCount,
  limit,
  timeout,
};
