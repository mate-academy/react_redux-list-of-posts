/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export interface UsersState {
  users: User[];
  author: User | null;
}

const initialState: UsersState = {
  users: [],
  author: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
