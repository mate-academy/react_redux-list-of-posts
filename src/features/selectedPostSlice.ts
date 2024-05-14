import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export type PostState = {
  post: Post | null;
};

const initialState: PostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      const currentState = state;

      currentState.post = action.payload;
    },
  },
});

export const selectPost = (state: RootState) => state.post.post;
export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
