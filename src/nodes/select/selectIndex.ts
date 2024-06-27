export function selectIndex(type: string, key: string, value: string | number | boolean) {
  return `SELECT FROM ${type} WHERE ${key} = '${value}'`;
}
