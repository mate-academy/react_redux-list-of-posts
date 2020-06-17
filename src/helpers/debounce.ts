export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
) => {
  let timerId: any;

  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(func, delay, ...args);
  };
};
