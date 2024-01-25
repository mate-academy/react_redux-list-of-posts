import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const init = createAsyncThunk('goods/fetch', () => {
  return getUsers();
});

type UsersState = {
  users: User[],
  author: User | null,
};

const initialState: UsersState = {
  users: [],
  author: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
  extraReducers: (build) => {
    build.addCase(init.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export default usersSlice.reducer;
export const { set } = usersSlice.actions;
