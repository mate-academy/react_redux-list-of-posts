import { client } from '../utils/fetchClient';
import { User } from '../types/User';
// import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUser = (id: number) => {
  return client.get<User[]>(`/users/${id}`);
};
