function wait(delay: number) {
  return new Promise(done => setTimeout(done, delay));
}

export async function read(key: string) {
  await wait(500);

  const data = window.localStorage.getItem(key);

  try {
    return data && JSON.parse(data);
  } catch (error) {
    return data;
  }
}

export async function write(key: string, data: any) {
  await wait(500);

  window.localStorage.setItem(key, JSON.stringify(data));
}

export function init(key: string, initialData: any) {
  if (!read(key)) {
    write(key, initialData);
  }
}
