import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export type SelectedPostState = {
  post: Post | null;
};

const initialState: SelectedPostState = {
  post: null,
};

/* eslint-disable no-param-reassign */
export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    removeSelectedPost: (state) => {
      state.post = null;
    },
  },
});

export const {
  setSelectedPost,
  removeSelectedPost,
} = selectedPostSlice.actions;

export const selectPost = (state: RootState) => state.selectedPost.post;

export default selectedPostSlice.reducer;
