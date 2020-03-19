const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getPosts = () => {
  return getData<Posts>(`${API_URL}posts`);
};

export const getUsers = () => {
  return getData<Users>(`${API_URL}users`);
};

export const getComments = () => {
  return getData<Comments>(`${API_URL}comments`);
};
