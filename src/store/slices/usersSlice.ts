/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../store';

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  isLoading: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  isLoading: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await getUsers();

    return response;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;

      return (
        !state.users.isLoading && !state.users.loaded && !state.users.hasError
      );
    },
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.isLoading = false;
      });
  },
});

// Селектори
export const selectUsers = (state: RootState) => state.users;

export const selectUsersItems = createSelector(
  selectUsers,
  users => users.items,
);

export const selectUsersLoaded = createSelector(
  selectUsers,
  users => users.loaded,
);

export const selectUsersError = createSelector(
  selectUsers,
  users => users.hasError,
);

export const selectUsersLoading = createSelector(
  selectUsers,
  users => users.isLoading,
);

export default usersSlice.reducer;
