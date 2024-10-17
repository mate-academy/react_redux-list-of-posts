// Create a promise that resolves with a given amount after 500ms
export const fetchCount = (amount = 1) => {
  return new Promise<number>(resolve => {
    setTimeout(() => resolve(amount), 500);
  });
};
