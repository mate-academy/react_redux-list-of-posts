/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export interface SelectPostState {
  selectedPost: Post | null;
}

const initialState: SelectPostState = {
  selectedPost: null,
};

export const selectPostSlice = createSlice({
  name: 'selectPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectPostSlice.actions;

// eslint-disable-next-line max-len
export const selectSelectedPost = (state: RootState) => state.selectPost.selectedPost;

export default selectPostSlice.reducer;
