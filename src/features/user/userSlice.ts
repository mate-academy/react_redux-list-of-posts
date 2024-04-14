/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { Post } from '../../types/Post';

export interface UserState {
  value: User[];
  author: User | null;
  loading: boolean;
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  value: [],
  author: null,
  loading: false,
  items: [],
  loaded: false,
  hasError: false,
};

export const getUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    assignAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, state => {
        state.loading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = true;
      })
      .addCase(getUsersAsync.rejected, state => {
        state.loading = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.user.value;
export const selectAuthor = (state: RootState) => state.user.author;

export const { assignAuthor } = userSlice.actions;

export default userSlice.reducer;
