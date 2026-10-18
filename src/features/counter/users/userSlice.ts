import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

export interface UsersState {
  users: User[];
  author: User | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [] as User[],
  author: null,
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
  const users = await getUsers();

  return users;
});
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;

export const { setAuthor } = usersSlice.actions;
