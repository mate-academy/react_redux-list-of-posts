/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post | null = {
  id: 0,
  userId: 0,
  title: '',
  body: '',
} as Post;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost(_state, action: PayloadAction<Post>) {
      return action.payload;
    },
  },
});

export default postSlice.reducer;
export const { setPost } = postSlice.actions;
