import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
/* eslint-disable no-param-reassign */

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost(_, action: PayloadAction<Post | null>) {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
