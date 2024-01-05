import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = () => {
  console.info('getUsers');// eslint-disable-line no-console

  return client.get<User[]>('/users');
};

export const getUser = (id: number) => {
  console.info('getUser ', id);// eslint-disable-line no-console

  return client.get<User[]>(`/users/${id}`);
};
