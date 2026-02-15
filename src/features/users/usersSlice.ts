import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/usersApi';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk(
  'users/fetch',
  async (_, { getState }) => {
    const { users } = getState() as { users: UsersState };

    if (users.users.length > 0) {
      return users.users;
    }

    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        if (state.users.length === 0) {
          state.loaded = false;
        }

        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loaded = true;
      })
      .addCase(loadUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
