import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUser = async (id: number) => {
  const response = await client.get<User>(`/users/${id}`);

  return response;
};
