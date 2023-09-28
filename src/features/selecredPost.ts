/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type AuthorState = {
  selectedPost: Post | null;
};

const initialState: AuthorState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },

    unsetPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setPost, unsetPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
