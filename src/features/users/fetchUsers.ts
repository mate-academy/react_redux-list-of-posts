import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { ThunkConfig } from '../../app/store';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig<boolean>>(
  'users/fetchUsers',
  async (_, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;

    try {
      const response = await getUsers();

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (e) {
      return rejectWithValue(true);
    }
  },
);
