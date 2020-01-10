const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = (BASE_URL, defaultData) => fetch(BASE_URL)
  .then(response => (response.ok ? response.json() : defaultData))
  .catch(() => defaultData);

export const getPostsFromServer = () => getData(`${API_URL}posts`, []);

export const getUsersFromServer = () => getData(`${API_URL}users`, []);

export const getCommentsFromServer = () => getData(`${API_URL}comments`, []);
