export function fetchCount(amount = 1) {
  return new Promise<number>(resolve => {
    setTimeout(() => resolve(amount), 500);
  });
}
