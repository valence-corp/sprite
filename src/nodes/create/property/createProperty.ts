export function createProperty(typeName: string, key: string) {
  return `CREATE PROPERTY ${typeName}.${key}`;
}
