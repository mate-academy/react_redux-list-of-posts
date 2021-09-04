export const BASE_URL = 'https://mate-api.herokuapp.com/';

// export function request(url: string, options?: object) {
//   return fetch(url, options)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }

//       return response.json();
//     })
//     .then(result => result.data);
// }

export const request = (url: string = '', options?: object) => {
  // console.log(BASE_URL + url);
  return fetch(BASE_URL + url, options).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
  });
};

export const add = (url: string = '', bodyObj: object) => {
  console.log('add', 1);
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
  // this is just a fake promise resolved in 2 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}
