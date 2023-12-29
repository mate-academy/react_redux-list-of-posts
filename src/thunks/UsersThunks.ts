import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';

export const getUsersThunk = createAsyncThunk(
  'users/getUsers', async () => {
    return getUsers();
  },
);
