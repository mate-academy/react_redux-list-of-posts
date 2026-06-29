/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const data = await getUsers();

  return data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
        state.error = 'Something went wrong';
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
