import { client } from '../utils/fetchClient';
import { User as UserType } from '../types/User';

export const getUsers = (): Promise<UserType[]> => {
  return client.get<UserType[]>('/users');
};

export const getUser = (id: number): Promise<UserType[]> => {
  return client.get<UserType[]>(`/users/${id}`);
};
