import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async () => {
  return client.get<User[]>('/users');
};

export const getUser = (id: number) => {
  return client.get<User[]>(`/users/${id}`);
};
