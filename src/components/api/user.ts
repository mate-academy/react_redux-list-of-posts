import { BASE_URL } from './api';

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);

  return res.json();
};
