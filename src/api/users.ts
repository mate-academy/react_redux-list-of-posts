import { User } from '../react-app-env';
import { BASE_URL } from './api';

export const getUsersFromServer = async ():Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};
