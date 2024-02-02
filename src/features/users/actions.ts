import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './action-type.enum';
import { getUsers } from '../../api/users';

const loadUsers = createAsyncThunk(
  ActionType.LOAD,
  async (_request, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export { loadUsers };
