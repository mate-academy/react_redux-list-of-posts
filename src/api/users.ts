import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async (): Promise<User[]> => {
  try {
    return await client.get<User[]>('/users');
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
};

export const getUser = async (id: number): Promise<User> => {
  try {
    return await client.get<User>(`/users/${id}`);
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
};
