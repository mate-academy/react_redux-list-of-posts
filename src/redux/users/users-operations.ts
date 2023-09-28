import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (_, thunkAPI) => {
    try {
      const data = await getUsers();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
);
