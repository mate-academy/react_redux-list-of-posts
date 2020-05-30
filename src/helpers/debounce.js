export const debounce = (f, delay) => {
  let timerId;

  return (...arg) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...arg)
  }
}
