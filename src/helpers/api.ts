const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

export const getAll = <T> (url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(responce => responce.json());
};
