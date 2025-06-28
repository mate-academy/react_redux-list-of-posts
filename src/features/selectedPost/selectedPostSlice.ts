/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { PayloadAction } from '@reduxjs/toolkit';

export interface CurrentPostState {
  currentPost: Post | null;
}

const initialState: CurrentPostState = {
  currentPost: null,
};

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<Post | null>) {
      state.currentPost = action.payload;
    },
  },
});

export const { setPost } = currentPostSlice.actions;
export default currentPostSlice.reducer;
