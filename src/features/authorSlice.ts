import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { loadPosts } from './postsSlice';
import { clear as clearSelectedPost } from './selectedPostSlice';
import { clear as clearComments } from './commentsSlice';
import { type AppDispatch } from '../app/store';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<User>) {
      return payload;
    },
  },
});

export const { set } = authorSlice.actions;
/* eslint-disable*/
export const setUserAndLoadPosts = createAsyncThunk<
  void,
  User,
  { dispatch: AppDispatch }
>('author/setUserAndLoadPosts', async (user, { dispatch }) => {
  dispatch(set(user));
  dispatch(clearSelectedPost());
  dispatch(clearComments());
  await dispatch(loadPosts(user.id));
});
/* eslint-enable */

export default authorSlice.reducer;
