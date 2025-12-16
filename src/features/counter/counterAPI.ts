// Create a promise that resolves with a given amount after 500ms
// Створити проміс, який вирішується із заданою кількістю через 500 мс
export function fetchCount(amount = 1) {
  return new Promise<number>(resolve => {
    setTimeout(() => resolve(amount), 500);
  });
}
