/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[],
  author: User | null,
  loaded: boolean,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  author: null,
  loaded: false,
  status: 'idle',
};

export const loadUsers = createAsyncThunk('users/loadUsers', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users.push(...action.payload);
    },
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.status = 'idle';
      state.users = action.payload;
    });
    builder.addCase(loadUsers.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default usersSlice.reducer;
export const { setUsers, setAuthor } = usersSlice.actions;
