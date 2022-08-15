import { client } from '../utils/axiosClient';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};
