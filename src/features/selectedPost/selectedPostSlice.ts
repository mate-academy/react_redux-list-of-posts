/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post | null = null;

const selectedPostSlice = createSlice({
  name: 'currentPost',
  initialState: initialState as Post | null,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
