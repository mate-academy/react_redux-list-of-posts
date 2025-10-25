import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.items.findIndex(u => u.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload; // eslint-disable-line no-param-reassign
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload; // eslint-disable-line no-param-reassign
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = true; // eslint-disable-line no-param-reassign
      });
  },
});

export const { updateUser } = usersSlice.actions;
export default usersSlice.reducer;
