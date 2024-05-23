/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../store';

export interface UsersState {
  usersList: User[];
  author: null | User;
}

const initialState: UsersState = {
  usersList: [],
  author: null,
};

export const fetchUsers = async () => {
  const users = await getUsers();

  return users;
};

export const usersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const value = await fetchUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload;
    },
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(usersAsync.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
  },
});

export const { setUsersList, setAuthor } = usersSlice.actions;

export const usersList = (state: RootState) => state.users.usersList;
export const selectedUser = (state: RootState) => state.users.author;

export default usersSlice.reducer;
