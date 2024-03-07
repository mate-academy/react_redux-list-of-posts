function read(key: string) {
  const data = window.localStorage.getItem(key);

  try {
    return data && JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function write<T>(key: string, data: T) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function init<T>(key: string, initialData: T) {
  if (!read(key)) {
    write(key, initialData);
  }
}
