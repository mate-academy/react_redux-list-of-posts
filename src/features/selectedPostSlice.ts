/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostState { selectedPost: Post | null }

const initialState: PostState = { selectedPost: null };

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
