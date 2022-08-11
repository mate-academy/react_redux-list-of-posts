import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[],
  loaded: boolean,
  error: boolean,
  author: User | null
}

const initialState: UsersState = {
  users: [],
  loaded: false,
  error: false,
  author: null,
};

export const loadUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loaded = true;
      })
      .addCase(loadUsers.rejected, state => {
        state.loaded = true;
        state.error = true;
      });
  },
});

export const { setAuthor } = usersSlice.actions;

export default usersSlice.reducer;
