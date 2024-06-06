export function selectIndex(type: string, key: string, value: any) {
  return `SELECT FROM ${type} WHERE ${key} = '${value}'`;
}
