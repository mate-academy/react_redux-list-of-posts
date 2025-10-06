import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { AppDispatch } from '../app/store';
import { loadPosts } from './postsSlice';
import { clear as clearSelectedPost } from './selectedPostSlice';
import { clear as clearComments } from './commentsSlice';

const initialState = null as User | null;

export const selectedUser = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<User>) {
      return payload;
    },
  },
});

export const { set } = selectedUser.actions;
/* eslint-disable*/
export const setUserAndLoadPosts = createAsyncThunk<
  void,
  User,
  { dispatch: AppDispatch }
>('selectedUser/setUserAndLoadPosts', async (user, { dispatch }) => {
  dispatch(set(user));
  dispatch(clearSelectedPost());
  dispatch(clearComments());
  await dispatch(loadPosts(user.id));
});
/* eslint-enable */

export default selectedUser.reducer;
