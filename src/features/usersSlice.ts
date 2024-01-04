import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  author: User | null;
}

const initialState: UsersState = {
  users: [],
  author: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
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

export const { setAuthor } = usersSlice.actions;

export default usersSlice.reducer;
