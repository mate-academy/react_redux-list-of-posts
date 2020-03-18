const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = (endPoint: string) => {
  return fetch(`${BASE_URL}${endPoint}`)
    .then(response => response.json());
};
