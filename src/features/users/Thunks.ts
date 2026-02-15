import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import type { User } from '../../types/User';

export const loadUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUsers();

  return users;
});
