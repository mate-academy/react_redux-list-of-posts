import { User } from '../types/User';
import { client } from '../utils/axiosClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUser = (id: number) => {
  return client.get<User[]>(`/users/${id}`);
};
