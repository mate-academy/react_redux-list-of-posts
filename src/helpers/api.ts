export const BASE_URL = 'https://mate.academy/students-api/';

export const request = (url: string = '', options?: object) => {
  return fetch(BASE_URL + url, options).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
  });
};

export function fetchMessage(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}
