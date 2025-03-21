import { fetchClient } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async () => {
  return fetchClient.get<User[]>('/users');
};
