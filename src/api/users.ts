import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users'); // This is fine, it returns an array of users
};

export const getUser = (id: number) => {
  return client.get<User>(`/users/${id}`); // Corrected to return a single User object
};
