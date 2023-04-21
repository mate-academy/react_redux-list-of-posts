/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;

export const selectSelectedPost = (state: RootState) => state.selectedPost.post;

export default selectedPostSlice.reducer;
