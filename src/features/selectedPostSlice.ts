import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPost {
  post: Post | null;
}

const initialState: SelectedPost = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
    clearPost: state => {
      state.post = null;
    },
  },
});

export const { setPost, clearPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
