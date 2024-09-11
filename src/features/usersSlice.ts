/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { LoadingStatuses } from '../enums/LoadingStatuses';
import { handleItemsLoading, handleItemsSuccess } from '../helpers/helpers';

interface UsersSlice {
  users: User[];
  usersLoadingState: LoadingStatuses;
  author: User | null;
}

const initialState: UsersSlice = {
  users: [],
  usersLoadingState: LoadingStatuses.idle,
  author: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const data = await getUsers();

    return data;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state: UsersSlice) => {
        handleItemsLoading(state, 'usersLoadingState', 'loading');
      })
      .addCase(fetchUsers.fulfilled, (state: UsersSlice, action) => {
        handleItemsSuccess(state, 'users', action.payload, 'usersLoadingState');
      })
      .addCase(fetchUsers.rejected, (state: UsersSlice) => {
        handleItemsLoading(state, 'usersLoadingState', 'error');
      })
      .addDefaultCase(() => {});
  },
});

export const { setAuthor } = usersSlice.actions;

export default usersSlice.reducer;
