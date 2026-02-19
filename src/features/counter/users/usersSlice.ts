/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

export interface UserState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchAll',
  async () => {
    const data = await getUsers();

    return data;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
