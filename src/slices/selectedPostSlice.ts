// src/slices/selectedPostSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = {
  postId: number | null;
  post: Post | null;
};

const initialState: SelectedPostState = {
  postId: null,
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost(_state, action: PayloadAction<Post | null>) {
      const payload = action.payload;

      if (payload === null) {
        return { ...initialState };
      }

      return {
        ...initialState,
        postId: payload.id,
        post: payload,
      } as SelectedPostState;
    },
    clearSelectedPost() {
      return { ...initialState };
    },
  },
});

export const { selectPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
