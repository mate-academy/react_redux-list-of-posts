import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type Init = {
  loading: boolean;
  users: User[];
  error: string;
};

const initialState: Init = {
  loading: false,
  users: [],
  error: '',
};

export const fetchUsers = createAsyncThunk('fetch/users', async () => {
  try {
    const respons = await getUsers();

    return respons;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });

    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.users = action.payload;

        // eslint-disable-next-line no-param-reassign
        state.loading = false;
      },
    );

    builder.addCase(fetchUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.error = 'we have some errors';
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });
  },
});
