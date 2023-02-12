import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';

type PostState = Post | null;

const initialState: PostState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as PostState,
  reducers: {
    setPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },

    resetPost: () => initialState,
  },
});

export const { setPost, resetPost } = selectedPostSlice.actions;

export const selectPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
