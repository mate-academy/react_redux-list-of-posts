import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  post: Post | null;
};

const initialState: PostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setlectPost(state, action: PayloadAction<Post>) {
      state.post = action.payload;
    },
    clearPost: state => {
      state.post = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setlectPost, clearPost } = selectedPostSlice.actions;
