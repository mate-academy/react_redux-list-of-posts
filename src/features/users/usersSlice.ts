/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchCount',
  async () => {
    const data = await client.get<User[]>('/users');

    return data;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchUsersAsync.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchUsersAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersHasError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
