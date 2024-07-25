import { createSlice } from '@reduxjs/toolkit';
import { Post } from './types/Post';

const initialState: Post | null = null;

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState: initialState,
  reducers: {
    set: (_state, action) => {
      return action.payload;
    },

    reset: () => {
      return null;
    },
  },
});

export const { set, reset } = selectedPost.actions;
export default selectedPost.reducer;
