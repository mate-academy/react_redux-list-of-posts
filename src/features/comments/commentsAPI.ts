export function fetchComments(amount = 1) {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(amount), 500);
  });
}
