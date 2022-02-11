import { BASE_URL } from './api';

export const getUsersList = async () => {
  const url = `${BASE_URL}/users`;

  const response = await fetch(url);

  return response.json();
};
