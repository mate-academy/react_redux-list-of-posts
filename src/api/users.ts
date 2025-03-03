import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async () => {
  try {
    const users = await client.get<User[]>('/users');

    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch users');
    } else {
      throw new Error('Failed to fetch users: Unknown error');
    }
  }
};

export const getUser = async (id: number) => {
  try {
    const user = await client.get<User[]>(`/users/${id}`);

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user with id ${id}: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch user with id ${id}: Unknown error`);
    }
  }
};
