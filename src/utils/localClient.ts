function read(key: string) {
  const data = window.localStorage.getItem(key);

  try {
    return data && JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function write(key: string, data: string) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function init(key: string, initialData: string) {
  if (!read(key)) {
    write(key, initialData);
  }
}
