import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';
/* eslint-disable no-param-reassign */

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost(_, action: PayloadAction<Post | null>) {
      return action.payload;
    },
    clearSelectedPost() {
      return null;
    },
  },
});

export const selectPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
