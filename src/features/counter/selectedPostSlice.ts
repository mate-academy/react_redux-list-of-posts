/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostState {
  selectedPost: Post | null;
}

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectPost: (state, actions: PayloadAction<Post | null>) => {
      state.selectedPost = actions.payload;
    },
  },
});

export default selectedPostSlice.reducer;
