import { ifNotExists } from "../../common/ifNotExists.js";
import { createProperty } from "./createProperty.js";
import { constraints } from "./constraints.js";

export const createPropertyNodes = {
  constraints,
  createProperty,
  ifNotExists,
};
