import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export enum ActionTypes {
  LOAD = 'users/load',
}

const loadUsers = createAsyncThunk(
  ActionTypes.LOAD,
  async (_request, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export { loadUsers };
