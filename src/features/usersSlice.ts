import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { RootState } from '../app/store';

export interface UsersState {
  loaded: boolean;
  hasError: boolean;
  items: User[];
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
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
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUsers = (state: RootState): User[] => state.users.items;
export const selectUsersStatus = createSelector(
  (state: RootState) => state.posts.loaded,
  (state: RootState) => state.posts.hasError,
  (loaded, hasError) => ({ loaded, hasError }),
);
