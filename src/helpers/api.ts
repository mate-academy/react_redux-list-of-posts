export const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = (url: string = '', options?: object) => {
  return fetch(BASE_URL + url, options).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
  });
};

export const add = (url: string = '', bodyObj: object) => {
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(bodyObj),
  });
};

export const remove = (url: string = '') => {
  request(url, { method: 'DELETE' });
};

export function fetchMessage(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}
