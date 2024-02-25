import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUser = (id: number) => {
  return client.get<User[]>(`/users/${id}`);
};

export const getUsers = createAsyncThunk('fetchUsers', async () => {
  return client.get<User[]>(`/users/`);
});
