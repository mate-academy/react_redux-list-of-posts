import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  users: User[],
  author: User | null,
};

const initialState: UserState = {
  users: [],
  author: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export const { setAuthor } = userSlice.actions;
export default userSlice.reducer;
