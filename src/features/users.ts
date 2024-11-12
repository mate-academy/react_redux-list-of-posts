import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserType = {
  users: User[];
  author: User | null;
};

const initialState: UserType = {
  users: [],
  author: null,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export const { set, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
