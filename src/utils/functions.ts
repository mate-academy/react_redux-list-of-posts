export function deleteItemFromArray<T, K extends keyof T>(
  array: T[],
  key: K,
  keyValue: T[K],
): T[] {
  return [...array].filter(item => item[key] !== keyValue);
}

export function addItemToArray<T>(array: T[], item: T): T[] {
  return [...array, item];
}
