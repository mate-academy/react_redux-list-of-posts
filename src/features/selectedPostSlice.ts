/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

/* eslint-disable prettier/prettier */
type SelectedPost = {
  post: Post | null;
};

const initialState: SelectedPost = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action) {
      state.post = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;