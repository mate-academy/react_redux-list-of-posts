import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const users = await client.get<User[]>('/users');

  return users;
});
