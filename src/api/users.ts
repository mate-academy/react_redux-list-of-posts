import { client } from '../utils/axiosClient';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUser = (id: number) => {
  return client.get<User[]>(`/users/${id}`);
};
